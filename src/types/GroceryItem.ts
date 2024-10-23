import { Receipt } from '~types/Receipt';
import { User } from '~types/User';

export type GroceryItem = {
    id: number;
    user: User;
    userId: number;
    receipt: Receipt;
    receiptId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchaseDate: Date | string;
    expiryDate: Date | string;
};
