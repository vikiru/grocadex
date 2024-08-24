import { prisma } from '@/data';
import { GroceryItem } from '@prisma/client';

export async function saveGroceryItem(groceryItem: Omit<GroceryItem, 'id'>): Promise<void> {
    try {
        await prisma.groceryItem.create({ data: groceryItem });
        console.log('Successfully saved grocery item to database.');
    } catch (error) {
        console.error(`Error saving grocery item to database: ${error}`);
    }
}

export async function saveMultipleGroceryItems(groceryItems: Omit<GroceryItem, 'id'>[]): Promise<void> {
    try {
        await prisma.groceryItem.createMany({
            data: groceryItems,
            skipDuplicates: true,
        });

        console.log('Successfully saved multiple grocery items to the database.');
    } catch (error) {
        console.error(`Error saving multiple grocery items to database: ${error}`);
    }
}

export async function retrieveGroceryItems(receiptId: number): Promise<GroceryItem[]> {
    try {
        const groceryItems = await prisma.groceryItem.findMany({ where: { receiptId } });
        console.log(`Successfully retrieved grocery items belonging to receipt ${receiptId}.`);
        return groceryItems;
    } catch (error) {
        console.error(`Error retrieving grocery items from database: ${error}`);
        return [];
    }
}

export async function retrieveGroceryItemById(groceryItemId: number): Promise<GroceryItem> {
    try {
        const groceryItem = await prisma.groceryItem.findUnique({ where: { id: groceryItemId } });
        console.log(`Successfully retrieved grocery item with id ${groceryItemId}.`);
        return groceryItem;
    } catch (error) {
        console.error(`Error retrieving grocery item from database: ${error}`);
    }
}

export async function updateGroceryItemById(groceryItemId: number, updatedFields: Partial<GroceryItem>): Promise<void> {
    try {
        await prisma.groceryItem.update({ where: { id: groceryItemId }, data: updatedFields });
        console.log('Successfully updated grocery item in the database.');
    } catch (error) {
        console.error(`Error updating grocery item in database: ${error}`);
    }
}
export async function removeGroceryItemById(groceryItemId: number): Promise<void> {
    try {
        await prisma.groceryItem.delete({ where: { id: groceryItemId } });
        console.log(`Successfully removed grocery item with id ${groceryItemId}.`);
    } catch (error) {
        console.error(`Error removing grocery item from database: ${error}`);
    }
}
