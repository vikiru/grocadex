import { DateTime } from 'luxon';
import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';

export const formatDate = (date: Date | string, format: string): string => {
    if (typeof date === 'string') {
        return DateTime.fromISO(date).toFormat(format);
    } else return DateTime.fromJSDate(date).toFormat(format);
};
export const createDateFromTimestamp = (timestamp: number): Date => {
    const date = DateTime.fromMillis(timestamp, { zone: 'utc' }).toJSDate();
    return date;
};

export const constructExpiryString = (date: string | Date): string => {
    const expiryDate = convertDatetoDateTime(date);
    const now = DateTime.now();
    const daysUntilExpiry = expiryDate.diff(now, 'days').days;

    if (daysUntilExpiry > 0) {
        return `Expiring in ${Math.abs(Math.ceil(daysUntilExpiry))} days`;
    } else if (daysUntilExpiry === 0) {
        return 'Expired today';
    } else {
        return `Expired ${Math.abs(Math.floor(daysUntilExpiry))} days ago`;
    }
};

export const sortActiveItems = (items: GroceryItem[] | Partial<GroceryItem>[]): void => {
    items.sort((a, b) => {
        const firstDate = convertDatetoDateTime(a.expiryDate!);
        const secondDate = convertDatetoDateTime(b.expiryDate!);
        firstDate, secondDate;
        return firstDate.diff(secondDate).toMillis();
    });
};

export const sortReceipts = (receipts: Receipt[] | Partial<Receipt>[]): void => {
    receipts.sort((a, b) => {
        const firstDate = convertDatetoDateTime(a.purchaseDate!);
        const secondDate = convertDatetoDateTime(b.purchaseDate!);
        return firstDate.diff(secondDate).toMillis();
    });
};

export const daysBetweenDates = (startDate: string | Date, endDate: string | Date): number => {
    const start = convertDatetoDateTime(startDate);
    const end = convertDatetoDateTime(endDate);
    return end.diff(start, 'days').days;
};

export const convertDatetoDateTime = (date: string | Date): DateTime => {
    if (typeof date === 'string') {
        return DateTime.fromISO(date);
    } else {
        return DateTime.fromJSDate(date);
    }
};

export const findExpiredItems = (items: GroceryItem[]): GroceryItem[] => {
    return items.filter((item) => {
        const expiryDate = convertDatetoDateTime(item.expiryDate);
        return expiryDate < DateTime.now();
    });
};
