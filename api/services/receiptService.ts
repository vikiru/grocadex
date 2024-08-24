import { Receipt } from '@prisma/client';
import { prisma } from '../data';

export async function saveReceipt(receipt: Omit<Receipt, 'id'>): Promise<void> {
    try {
        await prisma.receipt.create({ data: receipt });
        console.log('Successfully saved receipt to database.');
    } catch (error) {
        console.error(`Error saving receipt to database: ${error}`);
        throw error;
    }
}

export async function retrieveReceipts(userId: number): Promise<Receipt[]> {
    try {
        const receipts = await prisma.receipt.findMany({ where: { userId } });
        console.log('Successfully retrieved receipts from database.');
        return receipts;
    } catch (error) {
        console.error(`Error retrieving receipts from database: ${error}`);
        throw error;
    }
}

export async function retrieveReceiptById(id: number): Promise<Receipt | null> {
    try {
        const receipt = await prisma.receipt.findUnique({ where: { id } });
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

export async function updateReceiptById(id: number, updatedFields: Partial<Omit<Receipt, 'id'>>): Promise<void> {
    try {
        await prisma.receipt.update({ where: { id }, data: updatedFields });
        console.log('Successfully updated receipt in the database.');
    } catch (error) {
        console.error(`Error updating receipt with id ${id}: ${error}`);
        throw error;
    }
}

export async function removeReceiptById(id: number): Promise<void> {
    try {
        await prisma.receipt.delete({ where: { id } });
        console.log('Successfully removed receipt from the database.');
    } catch (error) {
        console.error(`Error removing receipt with id ${id}: ${error}`);
        throw error;
    }
}
