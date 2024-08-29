import { GroceryItem } from './GroceryItem';
import { Receipt } from './Receipt';
import { User } from './User';

export interface RequestPayload {
    url: string;
    id?: number;
    data?: User | GroceryItem | Receipt | GroceryItem[] | Receipt[];
}
