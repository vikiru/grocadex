import { Request, Response } from 'express';

import { GroceryItem } from '@prisma/client';
import { logger } from '~config/logger';
import { GroceryItemService } from '~services/';

export async function createGroceryItem(req: Request, res: Response): Promise<void> {
    const user = req.user;
    const groceryItem: GroceryItem = req.body;

    try {
        await GroceryItemService.saveGroceryItem(groceryItem, groceryItem.receiptId, user);
        res.status(201).json({ message: 'Grocery item created successfully' });
    } catch (error) {
        logger.error(`Error saving grocery item: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getGroceryItemsByReceiptId(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.receiptId, 10);

    try {
        const groceryItems = await GroceryItemService.retrieveGroceryItemsByReceiptId(userId, receiptId);

        if (groceryItems.length > 0) {
            res.status(200).json({
                data: groceryItems,
                message: 'Successfully retrieved all grocery items for receipt',
            });
        } else {
            res.status(404).json({ error: 'No grocery items found for this receipt' });
        }
    } catch (error) {
        logger.error(`Error retrieving grocery items: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getGroceryItemById(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;

    try {
        const groceryItem = await GroceryItemService.retrieveGroceryItemById(
            userId,
            parseInt(receiptId, 10),
            parseInt(groceryItemId, 10),
        );

        if (groceryItem) {
            res.status(200).json({ data: groceryItem });
        } else {
            res.status(404).json({ error: 'Grocery item not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving grocery item with id ${groceryItemId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function updateGroceryItem(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;
    const updatedFields = req.body;

    try {
        await GroceryItemService.updateGroceryItemById(
            userId,
            parseInt(receiptId, 10),
            parseInt(groceryItemId, 10),
            updatedFields,
        );
        res.status(200).json({ message: 'Grocery item updated successfully' });
    } catch (error) {
        logger.error(`Error updating grocery item with id ${groceryItemId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function deleteGroceryItem(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;

    try {
        await GroceryItemService.removeGroceryItemById(userId, parseInt(receiptId, 10), parseInt(groceryItemId, 10));
        res.status(200).json({ message: 'Grocery item deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting grocery item with id ${groceryItemId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
