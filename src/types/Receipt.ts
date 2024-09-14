import { GroceryItem } from '~types/GroceryItem';
import { User } from '~types/User';

export interface Receipt {
    id: number;
    user: User;
    userId: number;
    store: string;
    purchaseDate: Date;
    total: number;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
}
