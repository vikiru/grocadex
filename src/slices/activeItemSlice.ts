import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { GroceryItem } from './../types/GroceryItem';

type ActiveItemState = {
    activeItems: GroceryItem[] | Partial<GroceryItem>[];
};

const initialState: ActiveItemState = {
    activeItems: [],
};

const activeItemSlice = createSlice({
    name: 'activeItem',
    initialState,
    reducers: {
        updateActiveItem: (state, action) => {
            const groceryItem = action.payload;
            const index = state.activeItems.findIndex(
                (item) => item.id === groceryItem.id && item.receiptId === groceryItem.receiptId,
            );

            if (index !== -1) {
                state.activeItems[index] = {
                    ...state.activeItems[index],
                    ...groceryItem,
                };
            }
        },
        setActiveItems: (state, action) => {
            state.activeItems = action.payload;
        },
        resetActiveItems: (state) => {
            state.activeItems = [];
        },
        addActiveItem: (state, action) => {
            state.activeItems.push(action.payload);
        },
        addMultipleActiveItems: (state, action) => {
            state.activeItems = [...state.activeItems, ...action.payload];
        },
        removeActiveItem: (state, action) => {
            state.activeItems = state.activeItems.filter((item) => item.id !== action.payload);
        },
        removeItemsByReceipt: (state, action) => {
            state.activeItems = state.activeItems.filter((item) => item.receiptId !== action.payload);
        },
    },
});

export const {
    updateActiveItem,
    setActiveItems,
    resetActiveItems,
    addActiveItem,
    addMultipleActiveItems,
    removeActiveItem,
    removeItemsByReceipt,
} = activeItemSlice.actions;

export const selectActiveItems = (state: RootState) => state.activeItem.activeItems;

export default activeItemSlice.reducer;
