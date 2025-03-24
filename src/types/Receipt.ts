import { GroceryItem, User } from '~types/index';

export type Receipt = {
    id?: number;
    userId: number;
    store: string;
    purchaseDate: Date | string;
    total: number;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
};
