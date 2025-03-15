import { GroceryItem } from '@prisma/client';
import { logger } from '~config/logger';
import { prisma } from '~data/';

export async function removeGroceryItemById(
    userId: number,
    receiptId: number,
    groceryItemId: number,
): Promise<void> {
    try {
        await prisma.groceryItem.delete({
            where: { userId, receiptId, id: groceryItemId },
        });
        logger.info(
            `Successfully removed grocery item with id ${groceryItemId}.`,
        );
    } catch (error) {
        logger.error(`Error removing grocery item from database: ${error}`);
    }
}

export async function retrieveGroceryItemById(
    userId: number,
    receiptId: number,
    groceryItemId: number,
): Promise<GroceryItem> {
    try {
        const groceryItem = await prisma.groceryItem.findUnique({
            where: { userId, receiptId, id: groceryItemId },
        });
        logger.info(
            `Successfully retrieved grocery item with id ${groceryItemId}.`,
        );
        return groceryItem;
    } catch (error) {
        logger.error(`Error retrieving grocery item from database: ${error}`);
    }
}

export async function retrieveGroceryItemsByReceiptId(
    userId: number,
    receiptId: number,
): Promise<GroceryItem[]> {
    try {
        const groceryItems = await prisma.groceryItem.findMany({
            where: { userId, receiptId },
        });

        if (groceryItems.length > 0) {
            logger.info(
                `Successfully retrieved grocery items belonging to receipt ${receiptId}.`,
            );
        }

        return groceryItems;
    } catch (error) {
        logger.error(`Error retrieving grocery items from database: ${error}`);
    }
}

export async function retrieveGroceryItemsByUser(
    userId: number,
): Promise<GroceryItem[]> {
    try {
        const groceryItems = await prisma.groceryItem.findMany({
            where: { userId },
        });
        if (groceryItems.length > 0) {
            logger.info(
                `Successfully retrieved grocery items belonging to user ${userId}.`,
            );
        }
        return groceryItems;
    } catch (error) {
        logger.error(`Error retrieving grocery items from database: ${error}`);
    }
}

export async function saveGroceryItem(
    groceryItem: GroceryItem | GroceryItem[],
    receiptId: number,
    userId: number,
): Promise<void> {
    try {
        if (Array.isArray(groceryItem)) {
            await prisma.groceryItem.createMany({
                data: groceryItem.map((item) => ({
                    ...item,
                    receiptId,
                    userId,
                })),
                skipDuplicates: true,
            });
            logger.info(
                'Successfully saved multiple grocery items to the database.',
            );
        } else {
            await prisma.groceryItem.create({
                data: { ...groceryItem, receiptId },
            });
            logger.info('Successfully saved grocery item to the database.');
        }
    } catch (error) {
        logger.error(`Error saving grocery item(s) to database: ${error}`);
    }
}

export async function updateGroceryItemById(
    groceryItem: GroceryItem | Partial<GroceryItem>,
): Promise<GroceryItem | null> {
    try {
        const updatedItem = await prisma.groceryItem.update({
            where: {
                userId: groceryItem.userId,
                receiptId: groceryItem.receiptId,
                id: groceryItem.id,
            },
            data: groceryItem,
        });
        logger.info('Successfully updated grocery item in the database.');
        return updatedItem;
    } catch (error) {
        logger.error(`Error updating grocery item in database: ${error}`);
        return null;
    }
}
