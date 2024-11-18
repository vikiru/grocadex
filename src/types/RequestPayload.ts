import { GroceryItem, Receipt, User } from '~types/index';

export type RequestPayload = {
    url: string;
    id?: number;
    data?: User | Partial<User> | GroceryItem | GroceryItem[] | Receipt | Receipt[] | any;
};
