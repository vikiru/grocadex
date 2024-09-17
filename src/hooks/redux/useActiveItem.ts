import { useDispatch, useSelector } from 'react-redux';
import {
    addActiveItem,
    removeActiveItem,
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

    const removeItem = (id: number) => {
        dispatch(removeActiveItem(id));
    };

    const resetActiveItem = () => {
        dispatch(resetActiveItems());
    };

    return { activeItems, updateActiveItem, addItem, removeItem, resetActiveItem };
};
