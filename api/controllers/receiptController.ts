import { Request, Response } from 'express';

import { logger } from '../config/logger';
import { ReceiptService } from '../services';

export async function createReceipt(req: Request, res: Response): Promise<void> {
    const receipt = req.body;

    try {
        await ReceiptService.saveReceipt(receipt);
        res.status(201).json({ message: 'Receipt created successfully' });
    } catch (error) {
        logger.error(`Error saving receipt: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getReceiptsByUserId(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId, 10);

    try {
        const receipts = await ReceiptService.retrieveReceipts(userId);

        if (receipts.length > 0) {
            res.status(200).json({ data: receipts });
        } else {
            res.status(404).json({ error: 'No receipts found for this user' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipts: ${error}`);
        res.status(500).json({ error });
    }
}

export async function getReceiptById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        const receipt = await ReceiptService.retrieveReceiptById(id);

        if (receipt) {
            res.status(200).json({ data: receipt });
        } else {
            res.status(404).json({ error: 'Receipt not found' });
        }
    } catch (error) {
        logger.error(`Error retrieving receipt with id ${id}: ${error}`);
        res.status(500).json({ error });
    }
}

export async function updateReceipt(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedFields = req.body;

    try {
        await ReceiptService.updateReceiptById(id, updatedFields);
        res.status(200).json({ message: 'Receipt updated successfully' });
    } catch (error) {
        logger.error(`Error updating receipt with id ${id}: ${error}`);
        res.status(500).json({ error });
    }
}

export async function deleteReceiptById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        await ReceiptService.removeReceiptById(id);
        res.status(200).json({ message: 'Receipt deleted successfully' });
    } catch (error) {
        logger.error(`Error deleting receipt with id ${id}: ${error}`);
        res.status(500).json({ error });
    }
}
