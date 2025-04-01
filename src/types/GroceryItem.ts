export type GroceryItem = {
    id?: number;
    userId: number;
    receiptId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    purchaseDate: Date | string;
    expiryDate: Date | string;
    isActive: boolean;
};
