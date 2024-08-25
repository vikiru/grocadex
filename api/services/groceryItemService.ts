import { GroceryItem } from '@prisma/client';
import { logger } from '../config/logger';
import { prisma } from '../data';

export async function saveGroceryItem(groceryItem: Omit<GroceryItem, 'id'>): Promise<void> {
    try {
        await prisma.groceryItem.create({ data: groceryItem });
        logger.info('Successfully saved grocery item to database.');
    } catch (error) {
        logger.error(`Error saving grocery item to database: ${error}`);
    }
}

export async function saveMultipleGroceryItems(groceryItems: Omit<GroceryItem, 'id'>[]): Promise<void> {
    try {
        await prisma.groceryItem.createMany({
            data: groceryItems,
            skipDuplicates: true,
        });

        logger.info('Successfully saved multiple grocery items to the database.');
    } catch (error) {
        logger.error(`Error saving multiple grocery items to database: ${error}`);
    }
}

export async function retrieveGroceryItems(receiptId: number): Promise<GroceryItem[]> {
    try {
        const groceryItems = await prisma.groceryItem.findMany({ where: { receiptId } });
        logger.info(`Successfully retrieved grocery items belonging to receipt ${receiptId}.`);
        return groceryItems;
    } catch (error) {
        logger.error(`Error retrieving grocery items from database: ${error}`);
        return [];
    }
}

export async function retrieveGroceryItemById(groceryItemId: number): Promise<GroceryItem> {
    try {
        const groceryItem = await prisma.groceryItem.findUnique({ where: { id: groceryItemId } });
        logger.info(`Successfully retrieved grocery item with id ${groceryItemId}.`);
        return groceryItem;
    } catch (error) {
        logger.error(`Error retrieving grocery item from database: ${error}`);
    }
}

export async function updateGroceryItemById(groceryItemId: number, updatedFields: Partial<GroceryItem>): Promise<void> {
    try {
        await prisma.groceryItem.update({ where: { id: groceryItemId }, data: updatedFields });
        logger.info('Successfully updated grocery item in the database.');
    } catch (error) {
        logger.error(`Error updating grocery item in database: ${error}`);
    }
}
export async function removeGroceryItemById(groceryItemId: number): Promise<void> {
    try {
        await prisma.groceryItem.delete({ where: { id: groceryItemId } });
        logger.info(`Successfully removed grocery item with id ${groceryItemId}.`);
    } catch (error) {
        logger.error(`Error removing grocery item from database: ${error}`);
    }
}
