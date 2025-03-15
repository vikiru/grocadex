import { GroceryItem, PrismaData, Receipt, User, UserData } from '~types/index';

export type ResponseData =
    | GroceryItem
    | GroceryItem[]
    | PrismaData
    | Receipt
    | Receipt[]
    | User
    | User[]
    | UserData;
