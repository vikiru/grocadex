import * as ActiveItemService from '../services/activeItemService';

import { Request, Response } from 'express';

import { ActiveItemCreationAttributes } from '../models/ActiveItem';

export async function createActiveItem(req: Request, res: Response): Promise<void> {
    const activeItem: ActiveItemCreationAttributes = req.body;

    try {
        await ActiveItemService.saveActiveItem(activeItem);
        res.status(201).json({ message: 'Active item created successfully' });
    } catch (error) {
        console.error(`Error saving active item: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function getActiveItems(req: Request, res: Response): Promise<void> {
    try {
        const activeItems = await ActiveItemService.retrieveActiveItems();

        if (activeItems.length > 0) {
            res.status(200).json({ data: activeItems });
        } else {
            res.status(404).json({ error: 'No active items found' });
        }
    } catch (error) {
        console.error(`Error retrieving active items: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function getActiveItemById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        const activeItem = await ActiveItemService.retrieveActiveItemById(id);

        if (activeItem) {
            res.status(200).json({ data: activeItem });
        } else {
            res.status(404).json({ error: 'Active item not found' });
        }
    } catch (error) {
        console.error(`Error retrieving active item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function updateActiveItem(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedFields: ActiveItemCreationAttributes = req.body;

    try {
        await ActiveItemService.updateActiveItemById(id, updatedFields);
        res.status(200).json({ message: 'Active item updated successfully' });
    } catch (error) {
        console.error(`Error updating active item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteActiveItem(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        await ActiveItemService.removeActiveItemById(id);
        res.status(200).json({ message: 'Active item deleted successfully' });
    } catch (error) {
        console.error(`Error deleting active item with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
