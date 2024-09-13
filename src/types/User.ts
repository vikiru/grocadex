import { GroceryItem } from './GroceryItem';
import { Receipt } from './Receipt';

export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    receipts?: Receipt[];
    activeItems?: GroceryItem[];
}
