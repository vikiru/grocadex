import { Receipt } from '~types';
import { convertDatetoDateTime } from '~utils/date';

export const sortReceiptsByPurchaseDate = (receipts: Receipt[]): Receipt[] => {
    return receipts.sort((a, b) => {
        const firstDate = convertDatetoDateTime(a.purchaseDate);
        const secondDate = convertDatetoDateTime(b.purchaseDate);
        return secondDate.diff(firstDate).toMillis();
    });
};

export const filterReceiptsByMonthYear = (
    receipts: Receipt[],
    month: number,
    year: number,
): Receipt[] => {
    return receipts.filter((receipt) => {
        const receiptDate = convertDatetoDateTime(receipt.purchaseDate);
        const receiptMonth = receiptDate.month;
        const receiptYear = receiptDate.year;
        return receiptMonth === month && receiptYear === year;
    });
};

export const filterReceiptsByYear = (
    receipts: Receipt[],
    year: number,
): Receipt[] => {
    return receipts.filter((receipt) => {
        const receiptDate = convertDatetoDateTime(receipt.purchaseDate);
        const receiptYear = receiptDate.year;
        return receiptYear === year;
    });
};
