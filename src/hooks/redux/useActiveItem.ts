import { useDispatch, useSelector } from 'react-redux';
import {
    addActiveItem,
    removeActiveItem,
    resetActiveItems,
    selectActiveItems,
    setActiveItems,
} from '~slices/activeItemSlice';

import { GroceryItem } from '~types/GroceryItem';

export const useActiveItem = () => {
    const activeItems = useSelector(selectActiveItems);
    const dispatch = useDispatch();

    const updateActiveItem = (items: GroceryItem[]) => {
        dispatch(setActiveItems(items));
    };

    const addItem = (item: GroceryItem) => {
        dispatch(addActiveItem(item));
    };

    const removeItem = (id: number) => {
        dispatch(removeActiveItem(id));
    };

    const resetActiveItem = () => {
        dispatch(resetActiveItems());
    };

    return { activeItems, updateActiveItem, addItem, removeItem, resetActiveItem };
};
