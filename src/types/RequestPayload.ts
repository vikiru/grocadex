import { GroceryItem, Receipt, User } from '~types/index';

export type RequestPayload = {
    url: string;
    id?: number;
    data?:
        | any
        | GroceryItem
        | GroceryItem[]
        | Partial<User>
        | Receipt
        | Receipt[]
        | User;
};
