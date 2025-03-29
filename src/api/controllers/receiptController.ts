import { Request, Response } from 'express';
import { logger } from '~config/logger';
import { GroceryItemService, ReceiptService } from '~services';
import { ResponsePayload } from '~types';

export async function createReceipt(
    req: Request,
    res: Response,
): Promise<void> {
    const data = req.body;
    const { groceryItems, ...receiptData } = data;

    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const receipt = await ReceiptService.saveReceipt(receiptData);
        await GroceryItemService.saveGroceryItem(
            groceryItems,
            receipt.id,
            receipt.userId,
        );
        const updatedReceipt = await ReceiptService.retrieveReceiptByReceiptId(
            receipt.userId,
            receipt.id,
        );

        response['message'] = 'Receipt created successfully.';
        response['data'] = updatedReceipt;
        response['success'] = true;
        response['error'] = 'No error occurred.';
        res.status(201).json(response);
    } catch (error) {
        logger.error(`Error saving receipt: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to create receipt.';
        res.status(500).json(response);
    }
}

export async function deleteReceiptById(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.id, 10);
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        await ReceiptService.removeReceiptById(userId, receiptId);
        response['message'] = 'Receipt deleted successfully.';
        response['success'] = true;
        response['error'] = 'No error occurred.';
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Error deleting receipt with id ${receiptId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to delete receipt.';
        res.status(500).json(response);
    }
}

export async function getReceiptById(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.id, 10);
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const receipt = await ReceiptService.retrieveReceiptByReceiptId(
            userId,
            receiptId,
        );

        if (receipt) {
            response['data'] = receipt;
            response['success'] = true;
            response['message'] = 'Successfully retrieved receipt.';
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'Receipt not found.';
            response['error'] = 'No receipt found with the provided ID.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving receipt with id ${receiptId}: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve receipt.';
        res.status(500).json(response);
    }
}

export async function getReceiptsByMonth(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const { startMonth, endMonth } = req.params;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const monthlyReceipts = await ReceiptService.retrieveReceiptsByMonth(
            startMonth,
            endMonth,
            userId,
        );

        if (monthlyReceipts.length > 0) {
            response['data'] = monthlyReceipts;
            response['success'] = true;
            response['message'] =
                `Successfully retrieved ${monthlyReceipts.length} receipts.`;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No receipts found for the provided month.';
            response['error'] = 'No receipts found.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(
            `Error retrieving receipts for the months: ${startMonth}, ${endMonth}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve receipts.';
        res.status(500).json(response);
    }
}

export async function getReceiptsByUserId(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const response: ResponsePayload = {
        message: '',
        data: [],
        success: false,
        error: '',
    };

    try {
        const receipts = await ReceiptService.retrieveReceipts(userId);

        if (receipts.length > 0) {
            response['data'] = receipts;
            response['success'] = true;
            response['message'] = 'Successfully retrieved receipts.';
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No receipts found for this user.';
            response['error'] = 'No receipts found.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(`Error retrieving receipts: ${error}`);
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve receipts.';
        res.status(500).json(response);
    }
}

export async function getReceiptsByYear(
    req: Request,
    res: Response,
): Promise<void> {
    const userId = req.user;
    const { year } = req.params;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const yearlyReceipts = await ReceiptService.retrieveReceiptsByYear(
            parseInt(year, 10),
            userId,
        );

        if (yearlyReceipts.length > 0) {
            response['data'] = yearlyReceipts;
            response['success'] = true;
            response['message'] =
                `Successfully retrieved ${yearlyReceipts.length} receipts.`;
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'No receipts found for the provided year.';
            response['error'] = 'No receipts found.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(
            `Error retrieving receipts for the year, ${year}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to retrieve receipts.';
        res.status(500).json(response);
    }
}

export async function updateReceipt(
    req: Request,
    res: Response,
): Promise<void> {
    const receiptData = req.body;
    const response: ResponsePayload = {
        message: '',
        data: null,
        success: false,
        error: '',
    };

    try {
        const updatedReceipt = await ReceiptService.updateReceiptById(
            receiptData.userId,
            receiptData.id,
            receiptData,
            receiptData.groceryItems,
        );

        if (updatedReceipt) {
            response['data'] = updatedReceipt;
            response['success'] = true;
            response['message'] = 'Receipt updated successfully.';
            response['error'] = 'No error occurred.';
            res.status(200).json(response);
        } else {
            response['message'] = 'Receipt not found.';
            response['error'] = 'No receipt found with the provided ID.';
            res.status(404).json(response);
        }
    } catch (error) {
        logger.error(
            `Error updating receipt with id ${receiptData.id}: ${error}`,
        );
        response['message'] = 'Internal server error.';
        response['error'] = 'Failed to update receipt.';
        res.status(500).json(response);
    }
}
