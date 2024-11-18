import { GroceryItem, Receipt, User } from '~types/index';

export type ResponsePayload = {
    message: string;
    data: User | Receipt | GroceryItem | Receipt[] | GroceryItem[];
    success: boolean;
    error: string;
};
