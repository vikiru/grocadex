import { DateTime } from 'luxon';
import { GroceryItem } from '../types/GroceryItem';

export const formatDate = (date: Date, format: string) => {
    return DateTime.fromJSDate(date).toFormat(format);
};

export const createDateFromTimestamp = (timestamp: number): Date => {
    const date = DateTime.fromMillis(timestamp, { zone: 'utc' }).toJSDate();
    return date;
};

export const constructExpiryString = (date: Date): string => {
    const expiryDate = DateTime.fromJSDate(date);
    const now = DateTime.now();
    const daysUntilExpiry = expiryDate.diff(now, 'days').days;

    if (daysUntilExpiry > 0) {
        return `Expiring in ${Math.ceil(daysUntilExpiry)} days`;
    } else if (daysUntilExpiry === 0) {
        return 'Expired today';
    } else {
        return `Expired ${Math.floor(-daysUntilExpiry)} days ago`;
    }
};

export const sortActiveItems = (items: GroceryItem[]): GroceryItem[] => {
    return items.sort((a, b) => {
        const firstDate = DateTime.fromJSDate(a.expiryDate);
        const secondDate = DateTime.fromJSDate(b.expiryDate);
        return firstDate.diff(secondDate).toMillis();
    });
};

export const daysBetweenDates = (startDate: Date, endDate: Date): number => {
    const start = DateTime.fromJSDate(startDate);
    const end = DateTime.fromJSDate(endDate);
    return end.diff(start, 'days').days;
};

export const findExpiredItems = (items: GroceryItem[]): GroceryItem[] => {
    return items.filter((item) => {
        const expiryDate = DateTime.fromJSDate(item.expiryDate);
        return expiryDate < DateTime.now();
    });
};
