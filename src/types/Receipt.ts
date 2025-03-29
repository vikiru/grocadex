import { GroceryItem } from '~types';

export type Receipt = {
    id?: number;
    userId: number;
    store: string;
    purchaseDate: Date | string;
    total: number;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
};
