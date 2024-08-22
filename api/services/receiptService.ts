import { Receipt, ReceiptCreationAttributes } from '../models/Receipt';

export async function saveReceipt(receipt: ReceiptCreationAttributes): Promise<void> {
    try {
        await Receipt.addReceipt(receipt);
        console.log('Successfully saved receipt to database.');
    } catch (error) {
        console.error(`Error saving receipt to database: ${error}`);
        throw error;
    }
}

export async function retrieveReceipts(userId: number): Promise<Receipt[]> {
    try {
        const receipts = await Receipt.findAllReceipts(userId);
        console.log('Successfully retrieved receipts from database.');
        return receipts;
    } catch (error) {
        console.error(`Error retrieving receipts from database: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptById(id: number): Promise<Receipt | null> {
    try {
        const receipt = await Receipt.findReceiptById(id);
        if (!receipt) {
            console.warn(`Receipt with id ${id} not found.`);
        } else {
            console.log('Successfully retrieved receipt from database.');
        }
        return receipt;
    } catch (error) {
        console.error(`Error retrieving receipt with id ${id}: ${error}`);
        throw error;
    }
}

export async function updateReceiptById(id: number, updatedFields: ReceiptCreationAttributes): Promise<void> {
    try {
        await Receipt.updateReceiptById(id, updatedFields);
        console.log('Successfully updated receipt in the database.');
    } catch (error) {
        console.error(`Error updating receipt with id ${id}: ${error}`);
        throw error;
    }
}

export async function removeReceiptById(id: number): Promise<void> {
    try {
        await Receipt.removeReceiptById(id);
        console.log('Successfully removed receipt from the database.');
    } catch (error) {
        console.error(`Error removing receipt with id ${id}: ${error}`);
        throw error;
    }
}
