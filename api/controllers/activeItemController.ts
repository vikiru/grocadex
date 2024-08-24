import { Request, Response } from 'express';

import { ActiveItemService } from '@/services';

export async function createActiveItem(req: Request, res: Response): Promise<void> {
    const { userId, receiptIds } = req.body;

    try {
        await ActiveItemService.saveActiveItems(userId, receiptIds);
        res.status(201).json({ message: 'Active items created successfully' });
    } catch (error) {
        console.error(`Error saving active items: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getActiveItems(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);

    try {
        const activeItems = await ActiveItemService.retrieveActiveItems(userId);

        if (activeItems.length > 0) {
            res.status(200).json({ data: activeItems });
        } else {
            res.status(404).json({ error: 'No active items found' });
        }
    } catch (error) {
        console.error(`Error retrieving active items for user with id ${userId}: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getActiveItemById(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    const groceryItemId = parseInt(req.params.id, 10);

    try {
        const activeItem = await ActiveItemService.retrieveActiveItemById(userId, groceryItemId);

        if (activeItem) {
            res.status(200).json({ data: activeItem });
        } else {
            res.status(404).json({ error: 'Active item not found' });
        }
    } catch (error) {
        console.error(`Error retrieving active item with id ${groceryItemId}: ${error}`);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteActiveItems(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);
    const groceryItemIds = req.body.groceryItemIds;

    try {
        await ActiveItemService.removeActiveItems(userId, groceryItemIds);
        res.status(200).json({ message: 'Active items removed successfully' });
    } catch (error) {
        console.error(`Error removing active items from user ${userId}: ${error}`);
        res.status(500).json({ error });
    }
}
