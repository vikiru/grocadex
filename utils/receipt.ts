import { DateTime } from 'luxon';
import { Receipt } from '../types/Receipt';

export const sortReceiptsByPurchaseDate = (receipts: Receipt[]): Receipt[] => {
    return receipts.sort((a, b) => {
        const firstDate = DateTime.fromJSDate(a.purchaseDate);
        const secondDate = DateTime.fromJSDate(b.purchaseDate);
        return firstDate.diff(secondDate).toMillis();
    });
};

export const filterReceiptsByMonthYear = (receipts: Receipt[], month: number, year: number): Receipt[] => {
    return receipts.filter((receipt) => {
        const receiptDate = DateTime.fromJSDate(receipt.purchaseDate);
        const receiptMonth = receiptDate.month;
        const receiptYear = receiptDate.year;
        return receiptMonth === month && receiptYear === year;
    });
};

export const filterReceiptsByYear = (receipts: Receipt[], year: number): Receipt[] => {
    return receipts.filter((receipt) => {
        const receiptDate = DateTime.fromJSDate(receipt.purchaseDate);
        const receiptYear = receiptDate.year;
        return receiptYear === year;
    });
};
