import { Request, Response } from 'express';
import { GroceryItem } from '@prisma/client';
import { logger } from '~config/logger';
import { GroceryItemService } from '~services/';
import { ResponsePayload } from '~types/index';

export async function createGroceryItem(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const groceryItem: GroceryItem = req.body;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        await GroceryItemService.saveGroceryItem(
            groceryItem,
            groceryItem.receiptId,
            userId,
        );
        response['message'] = 'Successfully created the grocery item.';
        response['success'] = true;
        response['error'] = 'No error occurred.';
        res.status(201).json(response);
    } catch (error) {
        logger.error(`Error saving grocery item: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error saving the grocery item.';
        res.status(500).json(response);
    }
}

export async function deleteGroceryItem(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;

    console.log(req.params);
    console.log(req.body);
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        await GroceryItemService.removeGroceryItemById(
            userId,
            parseInt(receiptId, 10),
            parseInt(groceryItemId, 10),
        );
        response['message'] = 'Grocery item deleted successfully.';
        response['success'] = true;
        response['error'] = 'No error occurred.';
        res.status(200).json(response);
    } catch (error) {
        logger.error(
            `Error deleting grocery item with id ${groceryItemId}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error deleting the grocery item.';
        res.status(500).json(response);
    }
}

export async function getActiveGroceryItems(req: Request, res: Response) {
    const userId = req.user;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const activeItems =
            await GroceryItemService.retrieveActiveItems(userId);

        if (activeItems.length > 0) {
            response['message'] =
                'Successfully retrieved active grocery items.';
            response['data'] = activeItems;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No active grocery items found.';
            response['error'] = 'There are no active grocery items.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving active grocery items: ${error}`);
        response['message'] = 'Internal server error';
        response['error'] =
            'There was an error retrieving the active grocery items';
        res.status(500).json(response);
    }
}

export async function getGroceryItemById(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const groceryItem = await GroceryItemService.retrieveGroceryItemById(
            userId,
            parseInt(receiptId, 10),
            parseInt(groceryItemId, 10),
        );

        if (groceryItem) {
            response['message'] =
                'Successfully retrieved grocery item for the given id.';
            response['data'] = groceryItem;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No grocery item found for the given id.';
            response['error'] =
                'There was an error retrieving the grocery item for the given id.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(
            `Error retrieving grocery item with id ${groceryItemId}: ${error}`,
        );
        response['message'] = 'Internal server error...';
        response['error'] =
            'There was an error retrieving the grocery item for the given id.';
        res.status(500).json(response);
    }
}

export async function getGroceryItemsByReceiptId(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.receiptId, 10);
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const groceryItems =
            await GroceryItemService.retrieveGroceryItemsByReceiptId(
                userId,
                receiptId,
            );

        if (groceryItems.length > 0) {
            response['message'] =
                'Successfully retrieved all grocery items for receipt';
            response['data'] = groceryItems;
            response['success'] = true;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No grocery items found for this receipt';
            response['error'] =
                'There was an error retrieving the grocery items for the given receipt';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving grocery items: ${error}`);
        response['message'] = 'Internal server error';
        response['error'] =
            'There was an error retrieving the grocery items for the given receipt';
        res.status(500).json(response);
    }
}

export async function updateGroceryItem(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const { receiptId, groceryItemId } = req.params;
    const groceryItem = req.body;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const updatedItem =
            await GroceryItemService.updateGroceryItems(groceryItem);

        if (updatedItem) {
            response['success'] = true;
            response['message'] = 'Successfully updated grocery item.';
            response['data'] = updatedItem;
            response['error'] = 'No error occurred.';
            return res.status(200).json(response);
        } else {
            response['message'] = 'No grocery item found for the given id.';
            response['error'] =
                'There was an error retrieving the grocery item for the given id.';
            return res.status(404).json(response);
        }
    } catch (error) {
        logger.error(
            `Error updating grocery item with id ${groceryItemId}: belonging to receipt with id ${receiptId}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'There was an error updating the grocery item.';
        return res.status(500).json(response);
    }
}
