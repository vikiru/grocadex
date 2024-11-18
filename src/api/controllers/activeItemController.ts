import { Request, Response } from 'express';
import { ResponsePayload } from '~types/index';

import { logger } from '~config/logger';
import { ActiveItemService } from '~services/';

export async function createActiveItems(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const { receiptIds } = req.body;
    const response: ResponsePayload = { message: '', data: null, success: false, error: '' };

    try {
        await ActiveItemService.saveActiveItems(userId, receiptIds);
        response['message'] = 'Active items created successfully';
        response['success'] = true;
        response['error'] = 'No error occured.';
        res.status(201).json(response);
    } catch (error) {
        logger.error(`Error saving active items: ${error}`);
        response['mesasge'] = 'Internal server error';
        response['error'] = 'There was an error saving active items to the database.';
        res.status(500).json(response);
    }
}

export async function getActiveItems(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const response: ResponsePayload = { message: '', data: [], success: false, error: '' };
    try {
        const activeItems = await ActiveItemService.retrieveActiveItems(userId);

        if (activeItems.length > 0) {
            response['message'] = 'Successfully retrieved all active items for user.';
            response['data'] = activeItems;
            response['success'] = true;
            response['error'] = 'No error occured.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No active items found';
            response['error'] = 'There was an error retrieving the active items for the given user.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving active items for user with id ${userId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error retrieving the active items for the given user.';
        res.status(500).json(response);
    }
}

export async function getActiveItemById(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const groceryItemId = parseInt(req.params.id, 10);
    const response: ResponsePayload = { message: '', data: null, success: false, error: '' };

    try {
        const activeItem = await ActiveItemService.retrieveActiveItemById(userId, groceryItemId);

        if (activeItem) {
            response['message'] = 'Successfully retrieved active item for user.';
            response['data'] = activeItem;
            response['success'] = true;
            response['error'] = 'No error occured.';
            res.status(200).json(response);
        } else {
            response['message'] = 'Active item not found';
            response['error'] = 'No active item matching the given user id.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving active item with id ${groceryItemId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error retrieving the active item for the given user.';
        res.status(500).json(response);
    }
}

export async function deleteActiveItems(req: Request, res: Response): Promise<void> {
    const userId = req.user;
    const groceryItemIds = req.body.groceryItemIds;
    const response: ResponsePayload = { message: '', data: null, success: false, error: '' };

    try {
        await ActiveItemService.removeActiveItems(userId, groceryItemIds);
        response['message'] = 'Successfully removed active items';
        response['success'] = true;
        response['error'] = 'No error occured.';
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Error removing active items from user ${userId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error removing the active items for the given user.';
        res.status(500).json(response);
    }
}
