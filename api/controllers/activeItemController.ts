import { Response } from 'express';
import { logger } from '../config/logger';
import { ActiveItemService } from '../services';
import { UserRequest } from '../types/express';

export async function createActiveItems(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const { receiptIds } = req.body;

    try {
        await ActiveItemService.saveActiveItems(userId, receiptIds);
        res.status(201).json({ message: 'Active items created successfully' });
    } catch (error) {
        logger.error(`Error saving active items: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getActiveItems(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;

    try {
        const activeItems = await ActiveItemService.retrieveActiveItems(userId);

        if (activeItems.length > 0) {
            res.status(200).json({ data: activeItems, message: 'Successfully retrieved all active items for user' });
        } else {
            res.status(404).json({ error: 'No active items found' });
        }
    } catch (error) {
        logger.error(`Error retrieving active items for user with id ${userId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getActiveItemById(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const groceryItemId = parseInt(req.params.id, 10);

    try {
        const activeItem = await ActiveItemService.retrieveActiveItemById(userId, groceryItemId);

        if (activeItem) {
            res.status(200).json({ data: activeItem });
        } else {
            res.status(404).json({ error: 'Active item not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving active item with id ${groceryItemId}: ${error}`);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteActiveItems(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const groceryItemIds = req.body.groceryItemIds;

    try {
        await ActiveItemService.removeActiveItems(userId, groceryItemIds);
        res.status(200).json({ message: 'Active items removed successfully' });
    } catch (error) {
        logger.error(`Error removing active items from user ${userId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
