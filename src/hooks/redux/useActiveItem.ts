import { useDispatch, useSelector } from 'react-redux';
import {
    addActiveItem,
    addMultipleActiveItems,
    removeActiveItem,
    removeItemsByReceipt,
    resetActiveItems,
    selectActiveItems,
    setActiveItems,
    updateActiveItem,
    updateActiveItemsByReceipt,
} from '~slices/activeItemSlice';

import { GroceryItem } from '~types/index';
import { sortActiveItems } from '~utils/date';

export const useActiveItem = () => {
    const activeItems = useSelector(selectActiveItems);
    const dispatch = useDispatch();

    const updateItem = (updatedItem: GroceryItem) => {
        dispatch(updateActiveItem(updatedItem));
        sortActiveItems(activeItems);
    };

    const updateActiveItemsByReceiptId = (receiptId: number, updatedItems: GroceryItem[]) => {
        dispatch(updateActiveItemsByReceipt({ receiptId, updatedItems }));
    };

    const updateActiveItems = (items: GroceryItem[]) => {
        sortActiveItems(items);
        dispatch(setActiveItems(items));
    };

    const addItem = (item: GroceryItem) => {
        dispatch(addActiveItem(item));
    };

    const addMultipleItems = (items: GroceryItem[]) => {
        dispatch(addMultipleActiveItems(items));
    };

    const removeItem = (id: number) => {
        dispatch(removeActiveItem(id));
    };

    const removeItemsByReceiptId = (receiptId: number) => {
        dispatch(removeItemsByReceipt(receiptId));
    };

    const resetActiveItem = () => {
        dispatch(resetActiveItems());
    };

    return {
        activeItems,
        updateItem,
        updateActiveItems,
        updateActiveItemsByReceiptId,
        addItem,
        addMultipleItems,
        removeItem,
        removeItemsByReceiptId,
        resetActiveItem,
    };
};
