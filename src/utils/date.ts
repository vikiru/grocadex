import { DateTime } from 'luxon';
import { GroceryItem, Receipt } from '~types/index';

export const parseDate = (date: Date | string): Date => {
    if (typeof date === 'string') {
        return DateTime.fromISO(date).toJSDate();
    } else return DateTime.fromJSDate(date).toJSDate();
};

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
        return `Expiring in ${Math.abs(Math.ceil(daysUntilExpiry))} day${Math.abs(Math.ceil(daysUntilExpiry)) === 1 ? '' : 's'}`;
    } else if (daysUntilExpiry === 0) {
        return 'Expired today';
    } else {
        return `Expired ${Math.abs(Math.floor(daysUntilExpiry))} day${Math.abs(Math.floor(daysUntilExpiry)) === 1 ? '' : 's'} ago`;
    }
};

export const sortActiveItems = (items: GroceryItem[]): void => {
    items.sort((a, b) => {
        const firstDate = convertDatetoDateTime(a.expiryDate!);
        const secondDate = convertDatetoDateTime(b.expiryDate!);

        return firstDate.diff(secondDate).toMillis();
    });
};

export const sortReceipts = (receipts: Partial<Receipt>[]): void => {
    receipts.sort((a, b) => {
        const firstDate = convertDatetoDateTime(a.purchaseDate!);
        const secondDate = convertDatetoDateTime(b.purchaseDate!);
        return firstDate.diff(secondDate).toMillis();
    });
};

export const daysBetweenDates = (
    startDate: Date | string,
    endDate: Date | string,
): number => {
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
