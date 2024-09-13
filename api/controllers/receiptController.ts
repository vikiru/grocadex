import { GroceryItemService, ReceiptService } from '../services';

import { Response } from 'express';
import { logger } from '../config/logger';
import { UserRequest } from '../types/express';

export async function createReceipt(req: UserRequest, res: Response): Promise<void> {
    const data = req.body;
    const { groceryItems, ...receiptData } = data;

    try {
        const receipt = await ReceiptService.saveReceipt(receiptData);
        await GroceryItemService.saveGroceryItem(groceryItems, receipt.id, receipt.userId);
        res.status(201).json({ message: 'Receipt created successfully', data: receipt });
    } catch (error) {
        logger.error(`Error saving receipt: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getReceiptsByUserId(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    try {
        const receipts = await ReceiptService.retrieveReceipts(userId);

        if (receipts.length > 0) {
            res.status(200).json({ data: receipts });
        } else {
            res.status(404).json({ error: 'No receipts found for this user' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipts: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getReceiptById(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.id, 10);

    try {
        const receipt = await ReceiptService.retrieveReceiptByReceiptId(userId, receiptId);

        if (receipt) {
            res.status(200).json({ data: receipt, message: 'Successfully retrieved receipt' });
        } else {
            res.status(404).json({ error: 'Receipt not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipt with id ${receiptId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function updateReceipt(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.id, 10);
    const updatedFields = req.body;

    try {
        await ReceiptService.updateReceiptById(userId, receiptId, updatedFields);
        res.status(200).json({ message: 'Receipt updated successfully' });
    } catch (error) {
        logger.error(`Error updating receipt with id ${receiptId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function deleteReceiptById(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const receiptId = parseInt(req.params.id, 10);

    try {
        await ReceiptService.removeReceiptById(userId, receiptId);
        res.status(200).json({ message: 'Receipt deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting receipt with id ${receiptId}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getReceiptsByMonth(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const { startMonth, endMonth } = req.params;

    try {
        const monthlyReceipts = await ReceiptService.retrieveReceiptsByMonth(startMonth, endMonth, userId);
        if (monthlyReceipts.length > 0) {
            res.status(200).json({
                data: monthlyReceipts,
                message: `Successfully retrieved ${monthlyReceipts.length} receipts`,
            });
        } else {
            res.status(404).json({ error: 'No receipts found for the provided month' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipts for the months: ${startMonth}, ${endMonth}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}

export async function getReceiptsByYear(req: UserRequest, res: Response): Promise<void> {
    const userId = req.user;
    const { year } = req.params;
    try {
        const yearlyReceipts = await ReceiptService.retrieveReceiptsByYear(parseInt(year, 10), userId);
        if (yearlyReceipts.length > 0) {
            res.status(200).json({
                data: yearlyReceipts,
                message: `Successfully retrieved ${yearlyReceipts.length} receipts`,
            });
        } else {
            res.status(404).json({ error: 'No receipts found for the provided year' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipts for the year, ${year}: ${error}`);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
