import { GroceryItem, PrismaData, Receipt, User, UserData } from '~types/index';

export type ResponseData = GroceryItem | Receipt | User | GroceryItem[] | Receipt[] | User[] | UserData | PrismaData;
