import { Receipt } from './Receipt';
import { User } from './User';

export interface GroceryItem {
    id: number;
    user: User;
    userId: number;
    receipt: Receipt;
    receiptId: number;
    name: string;
    quantity: number;
    unitPrice: number;
}
