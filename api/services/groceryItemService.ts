import GroceryItem, { GroceryItemCreationAttributes } from '../models/GroceryItem';

export async function saveGroceryItem(groceryItem: GroceryItemCreationAttributes): Promise<void> {
    try {
        await GroceryItem.addGroceryItem(groceryItem);
        console.log('Successfully saved grocery item to database.');
    } catch (error) {
        console.error(`Error saving grocery item to database: ${error}`);
    }
}

export async function retrieveGroceryItems(receiptId: number): Promise<GroceryItem[]> {
    try {
        const groceryItems = await GroceryItem.findAllGroceryItems(receiptId);
        console.log('Successfully retrieved grocery items from database.');
        return groceryItems;
    } catch (error) {
        console.error(`Error retrieving grocery items from database: ${error}`);
    }
}

export async function retrieveGroceryItemById(id: number): Promise<GroceryItem | null> {
    try {
        const groceryItem = await GroceryItem.findGroceryItemById(id);
        if (!groceryItem) {
            console.warn(`Grocery item with id ${id} not found.`);
        } else {
            console.log('Successfully retrieved grocery item from database.');
        }
        return groceryItem;
    } catch (error) {
        console.error(`Error retrieving grocery item with id ${id}: ${error}`);
    }
}

export async function updateGroceryItemById(id: number, updatedFields: GroceryItemCreationAttributes): Promise<void> {
    try {
        await GroceryItem.updateGroceryItemById(id, updatedFields);
        console.log('Successfully updated grocery item in the database.');
    } catch (error) {
        console.error(`Error updating grocery item with id ${id}: ${error}`);
    }
}

export async function removeGroceryItemById(id: number): Promise<void> {
    try {
        await GroceryItem.removeGroceryItemById(id);
        console.log('Successfully removed grocery item from the database.');
    } catch (error) {
        console.error(`Error removing grocery item with id ${id}: ${error}`);
    }
}
