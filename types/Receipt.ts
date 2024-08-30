import { User } from './User';

export interface Receipt {
    id: number;
    user: User;
    userId: number;
    store: string;
    purchaseDate: Date;
    total: number;
    groceryItems: GroceryItem[];
}
