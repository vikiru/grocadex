import { GroceryItem, Receipt } from '@prisma/client';

import { logger } from '~config/logger';
import { prisma } from '~data/';

export async function removeReceiptById(
    userId: number,
    receiptId: number,
): Promise<void> {
    try {
        await prisma.receipt.delete({ where: { userId, id: receiptId } });
        logger.info('Successfully removed receipt from the database.');
    } catch (error) {
        logger.error(`Error removing receipt with id ${receiptId}: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptByReceiptId(
    userId: number,
    receiptId: number,
): Promise<null | Receipt> {
    try {
        const receipt = await prisma.receipt.findUnique({
            where: { userId, id: receiptId },
            include: { groceryItems: true },
        });
        if (!receipt) {
            logger.error(`Receipt with id ${receiptId} not found.`);
        } else {
            logger.info('Successfully retrieved receipt from database.');
        }
        return receipt;
    } catch (error) {
        logger.error(`Error retrieving receipt with id ${receiptId}: ${error}`);
        throw error;
    }
}

export async function retrieveReceipts(userId: number): Promise<Receipt[]> {
    try {
        const receipts = await prisma.receipt.findMany({
            where: { userId },
            include: { groceryItems: true },
        });
        logger.info('Successfully retrieved receipts from database.');
        return receipts;
    } catch (error) {
        logger.error(`Error retrieving receipts from database: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptsByMonth(
    startDate: string,
    endDate: string,
    userId: number,
): Promise<Receipt[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);

    try {
        const receipts = await prisma.receipt.findMany({
            where: {
                userId,
                purchaseDate: {
                    gte: start,
                    lte: end,
                },
            },
        });
        logger.info(
            `Successfully retrieved ${receipts.length} receipts from ${startDate} - ${endDate} for user ${userId}.`,
        );
        return receipts;
    } catch (error) {
        logger.error(
            `Error retrieving monthly receipts from ${startDate} to ${endDate} for ${userId}: ${error}`,
        );
    }
}

export async function retrieveReceiptsByYear(
    year: number,
    userId: number,
): Promise<Receipt[]> {
    try {
        const receipts = await prisma.receipt.findMany({
            where: {
                userId,
                purchaseDate: {
                    gte: new Date(year, 0, 1),
                    lte: new Date(year, 11, 31),
                },
            },
        });
        logger.info(
            `Successfully retrieved ${receipts.length} receipts for the year ${year} for ${userId}.`,
        );
        return receipts;
    } catch (error) {
        logger.error(
            `Error retrieving yearly receipts for the year ${year} for ${userId}: ${error}`,
        );
    }
}

export async function saveReceipt(
    receipt: Omit<Receipt, 'id'>,
): Promise<Receipt> {
    try {
        const savedReceipt = await prisma.receipt.create({
            data: {
                ...receipt,
            },

            include: { groceryItems: true },
        });
        logger.info('Successfully saved receipt to database.');
        return savedReceipt;
    } catch (error) {
        logger.error(`Error saving receipt to database: ${error}`);
        throw error;
    }
}

export async function updateReceiptById(
    userId: number,
    receiptId: number,
    updatedReceipt: Receipt,
    updatedGroceryItems: GroceryItem[],
): Promise<Receipt> {
    try {
        const existingGroceryItems = await prisma.groceryItem.findMany({
            where: { receiptId: receiptId },
        });
        const newGroceryItems = updatedGroceryItems.filter((item) => !item.id);
        const deletedItemIds = existingGroceryItems
            .filter(
                (item) =>
                    !updatedGroceryItems.some(
                        (updatedItem) => updatedItem.id === item.id,
                    ),
            )
            .map((item) => item.id);

        const receipt = await prisma.receipt.update({
            where: {
                id: receiptId,
                userId: userId,
            },
            data: {
                ...updatedReceipt,
                groceryItems: {
                    update: updatedGroceryItems
                        .map((item) => {
                            if (item.id) {
                                return {
                                    where: { id: item.id },
                                    data: {
                                        name: item.name,
                                        quantity: item.quantity,
                                        unitPrice: item.unitPrice,
                                        totalPrice: item.totalPrice,
                                        purchaseDate:
                                            updatedReceipt.purchaseDate,
                                        expiryDate: item.expiryDate,
                                    },
                                };
                            }
                            return null;
                        })
                        .filter(Boolean),
                    create: newGroceryItems.map((item) => ({
                        name: item.name,
                        quantity: item.quantity,
                        unitPrice: item.unitPrice,
                        totalPrice: item.totalPrice,
                        purchaseDate: updatedReceipt.purchaseDate,
                        expiryDate: item.expiryDate,
                    })),
                    deleteMany: deletedItemIds.map((id) => ({ id })),
                },
            },
            include: {
                groceryItems: true,
            },
        });

        logger.info('Successfully updated receipt in the database.');
        return receipt;
    } catch (error) {
        logger.error(`Error updating receipt with id ${receiptId}: ${error}`);
        throw error;
    }
}
