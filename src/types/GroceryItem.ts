import { Receipt, User } from '~types/index';

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
