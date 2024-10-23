import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    receipts?: Receipt[];
    activeItems?: GroceryItem[];
};
