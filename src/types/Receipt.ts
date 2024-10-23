import { GroceryItem } from '~types/GroceryItem';
import { User } from '~types/User';

export type Receipt = {
    id: number;
    user: User;
    userId: number;
    store: string;
    purchaseDate: Date | string;
    total: number;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
};
