import { useDispatch, useSelector } from 'react-redux';
import {
    addGroceryItem,
    removeGroceryItem,
    resetGroceryItems,
    selectGroceryItems,
    setGroceryItems,
    updateGroceryItem,
} from '~slices/groceryItemSlice';

import { GroceryItem } from '~types/index';

export const useGrocery = () => {
    const groceryItems = useSelector(selectGroceryItems);
    const dispatch = useDispatch();

    const updateGroceryItems = (items: GroceryItem[]) => {
        dispatch(setGroceryItems(items));
    };

    const resetItems = () => {
        dispatch(resetGroceryItems());
    };

    const addItem = (item: GroceryItem) => {
        dispatch(addGroceryItem(item));
    };

    const removeItem = (id: number) => {
        dispatch(removeGroceryItem(id));
    };

    const updateItem = (receiptId: number, groceryItemId: number, updatedItem: GroceryItem) => {
        dispatch(updateGroceryItem({ receiptId, groceryItemId, updatedItem }));
    };

    return { groceryItems, updateGroceryItems, resetItems, addItem, removeItem, updateItem };
};
