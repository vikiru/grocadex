import * as GroceryItemService from '../services/groceryItemService';

import { Request, Response } from 'express';

import { GroceryItemCreationAttributes } from '../models/GroceryItem';

export async function createGroceryItem(req: Request, res: Response): Promise<void> {
    const groceryItem: GroceryItemCreationAttributes = req.body;

    try {
        await GroceryItemService.saveGroceryItem(groceryItem);
        res.status(201).json({ message: 'Grocery item created successfully' });
    } catch (error) {
        console.error(`Error saving grocery item: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function getGroceryItemsByReceiptId(req: Request, res: Response): Promise<void> {
    const receiptId = parseInt(req.params.receiptId, 10);

    try {
        const groceryItems = await GroceryItemService.retrieveGroceryItems(receiptId);

        if (groceryItems.length > 0) {
            res.status(200).json({ data: groceryItems });
        } else {
            res.status(404).json({ error: 'No grocery items found for this receipt' });
        }
    } catch (error) {
        console.error(`Error retrieving grocery items: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function getGroceryItemById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        const groceryItem = await GroceryItemService.retrieveGroceryItemById(id);

        if (groceryItem) {
            res.status(200).json({ data: groceryItem });
        } else {
            res.status(404).json({ error: 'Grocery item not found' });
        }
    } catch (error) {
        console.error(`Error retrieving grocery item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function updateGroceryItem(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedFields: GroceryItemCreationAttributes = req.body;

    try {
        await GroceryItemService.updateGroceryItemById(id, updatedFields);
        res.status(200).json({ message: 'Grocery item updated successfully' });
    } catch (error) {
        console.error(`Error updating grocery item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteGroceryItem(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        await GroceryItemService.removeGroceryItemById(id);
        res.status(200).json({ message: 'Grocery item deleted successfully' });
    } catch (error) {
        console.error(`Error deleting grocery item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
