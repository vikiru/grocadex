import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';
import { User } from '~types/User';

export type ResponsePayload = {
    message: string;
    data: User | Receipt | GroceryItem | Receipt[] | GroceryItem[];
    success: boolean;
    error: string;
};
