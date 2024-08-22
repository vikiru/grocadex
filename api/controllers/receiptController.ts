import { Request, Response } from 'express';

import { ReceiptCreationAttributes } from '../models/Receipt';
import { ReceiptService } from '../services';

export async function createReceipt(req: Request, res: Response): Promise<void> {
    const receipt: ReceiptCreationAttributes = req.body;

    try {
        await ReceiptService.saveReceipt(receipt);
        res.status(201).json({ message: 'Receipt created successfully' });
    } catch (error) {
        console.error(`Error saving receipt: ${error.message}`);
        res.status(500).json({ error: error.message });
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
        console.error(`Error retrieving receipts: ${error.message}`);
        res.status(500).json({ error: error.message });
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
        console.error(`Error retrieving receipt with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function updateReceipt(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);
    const updatedFields: ReceiptCreationAttributes = req.body;

    try {
        await ReceiptService.updateReceiptById(id, updatedFields);
        res.status(200).json({ message: 'Receipt updated successfully' });
    } catch (error) {
        console.error(`Error updating receipt with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}

export async function deleteReceiptById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id, 10);

    try {
        await ReceiptService.removeReceiptById(id);
        res.status(200).json({ message: 'Receipt deleted successfully' });
    } catch (error) {
        console.error(`Error deleting receipt with id ${id}: ${error.message}`);
        res.status(500).json({ error: error.message });
    }
}
