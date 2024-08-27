import { Receipt } from '@prisma/client';
import { logger } from '../config/logger';
import { prisma } from '../data';

export async function saveReceipt(receipt: Omit<Receipt, 'id'>): Promise<void> {
    try {
        await prisma.receipt.create({ data: receipt });
        logger.info('Successfully saved receipt to database.');
    } catch (error) {
        logger.error(`Error saving receipt to database: ${error}`);
        throw error;
    }
}

export async function retrieveReceipts(userId: number): Promise<Receipt[]> {
    try {
        const receipts = await prisma.receipt.findMany({ where: { userId } });
        logger.info('Successfully retrieved receipts from database.');
        return receipts;
    } catch (error) {
        logger.error(`Error retrieving receipts from database: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptByReceiptId(userId: number, receiptId: number): Promise<Receipt | null> {
    try {
        const receipt = await prisma.receipt.findUnique({ where: { userId, id: receiptId } });
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

export async function updateReceiptById(
    userId: number,
    receiptId: number,
    updatedFields: Partial<Omit<Receipt, 'id'>>,
): Promise<void> {
    try {
        await prisma.receipt.update({ where: { userId, id: receiptId }, data: updatedFields });
        logger.info('Successfully updated receipt in the database.');
    } catch (error) {
        logger.error(`Error updating receipt with id ${receiptId}: ${error}`);
        throw error;
    }
}

export async function removeReceiptById(userId: number, receiptId: number): Promise<void> {
    try {
        await prisma.receipt.delete({ where: { userId, id: receiptId } });
        logger.info('Successfully removed receipt from the database.');
    } catch (error) {
        logger.error(`Error removing receipt with id ${receiptId}: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptsByMonth(startDate: string, endDate: string, userId: number): Promise<Receipt[]> {
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
        logger.error(`Error retrieving monthly receipts from ${startDate} to ${endDate} for ${userId}: ${error}`);
    }
}

export async function retrieveReceiptsByYear(year: number, userId: number): Promise<Receipt[]> {
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
        logger.info(`Successfully retrieved ${receipts.length} receipts for the year ${year} for ${userId}.`);
        return receipts;
    } catch (error) {
        logger.error(`Error retrieving yearly receipts for the year ${year} for ${userId}: ${error}`);
    }
}
