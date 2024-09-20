import { useDispatch, useSelector } from 'react-redux';
import {
    addActiveItem,
    addMultipleActiveItems,
    removeActiveItem,
    removeItemsByReceipt,
    resetActiveItems,
    selectActiveItems,
    setActiveItems,
} from '~slices/activeItemSlice';

import { GroceryItem } from '~types/GroceryItem';
import { sortActiveItems } from '~utils/date';

export const useActiveItem = () => {
    const activeItems = useSelector(selectActiveItems);
    const dispatch = useDispatch();

    const updateActiveItem = (items: GroceryItem[]) => {
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
        updateActiveItem,
        addItem,
        addMultipleItems,
        removeItem,
        removeItemsByReceiptId,
        resetActiveItem,
    };
};
