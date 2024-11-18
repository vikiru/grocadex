import { GroceryItem, Receipt, User, UserData } from '~types/index';

export type ResponsePayload = {
    message: string;
    data: User | UserData | Receipt | GroceryItem | Receipt[] | GroceryItem[];
    success: boolean;
    error: string;
};
