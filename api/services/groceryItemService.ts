import { GroceryItem } from '@prisma/client';
import { logger } from '../config/logger';
import { prisma } from '../data';

export async function saveGroceryItem(groceryItem: GroceryItem | GroceryItem[]): Promise<void> {
    try {
        if (Array.isArray(groceryItem)) {
            await prisma.groceryItem.createMany({
                data: groceryItem,
                skipDuplicates: true,
            });
            logger.info('Successfully saved multiple grocery items to the database.');
        } else {
            await prisma.groceryItem.create({
                data: groceryItem,
            });
            logger.info('Successfully saved grocery item to the database.');
        }
    } catch (error) {
        logger.error(`Error saving grocery item(s) to database: ${error}`);
    }
}

export async function retrieveGroceryItems(userId: number, receiptId: number): Promise<GroceryItem[]> {
    try {
        const groceryItems = await prisma.groceryItem.findMany({ where: { userId, receiptId } });

        if (groceryItems.length > 0) {
            logger.info(`Successfully retrieved grocery items belonging to receipt ${receiptId}.`);
        }

        return groceryItems;
    } catch (error) {
        logger.error(`Error retrieving grocery items from database: ${error}`);
    }
}

export async function retrieveGroceryItemById(
    userId: number,
    receiptId: number,
    groceryItemId: number,
): Promise<GroceryItem> {
    try {
        const groceryItem = await prisma.groceryItem.findUnique({ where: { userId, receiptId, id: groceryItemId } });
        logger.info(`Successfully retrieved grocery item with id ${groceryItemId}.`);
        return groceryItem;
    } catch (error) {
        logger.error(`Error retrieving grocery item from database: ${error}`);
    }
}

export async function updateGroceryItemById(
    userId: number,
    receiptId: number,
    groceryItemId: number,
    updatedFields: Partial<GroceryItem>,
): Promise<void> {
    try {
        await prisma.groceryItem.update({ where: { userId, receiptId, id: groceryItemId }, data: updatedFields });
        logger.info('Successfully updated grocery item in the database.');
    } catch (error) {
        logger.error(`Error updating grocery item in database: ${error}`);
    }
}
export async function removeGroceryItemById(userId: number, receiptId: number, groceryItemId: number): Promise<void> {
    try {
        await prisma.groceryItem.delete({ where: { userId, receiptId, id: groceryItemId } });
        logger.info(`Successfully removed grocery item with id ${groceryItemId}.`);
    } catch (error) {
        logger.error(`Error removing grocery item from database: ${error}`);
    }
}
