import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';
import { User } from '~types/User';

export type RequestPayload = {
    url: string;
    id?: number;
    data?: User | Partial<User> | GroceryItem | GroceryItem[] | Receipt | Receipt[] | any;
};
