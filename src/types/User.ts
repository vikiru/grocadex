import { Expense, GroceryItem, Receipt } from '~types/index';

export type User = {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    receipts?: Receipt[];
    groceryItems?: GroceryItem[];
    expenses?: Expense[];
};
