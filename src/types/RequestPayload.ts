import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';
import { User } from '~types/User';

export interface RequestPayload {
    url: string;
    id?: number;
    data?: User | GroceryItem | Receipt | GroceryItem[] | Receipt[] | Partial<User> | any;
}
