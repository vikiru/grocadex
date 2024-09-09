import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { GroceryItem } from './../types/GroceryItem';

interface ActiveItemState {
    activeItems: GroceryItem[] | Partial<GroceryItem>[];
}

const initialState: ActiveItemState = {
    activeItems: [],
};

const activeItemSlice = createSlice({
    name: 'activeItem',
    initialState,
    reducers: {
        setActiveItems: (state, action) => {
            state.activeItems = action.payload;
        },
        resetActiveItems: (state) => {
            state.activeItems = [];
        },
        addActiveItem: (state, action) => {
            state.activeItems.push(action.payload);
        },
        removeActiveItem: (state, action) => {
            state.activeItems = state.activeItems.filter((item) => item.id !== action.payload);
        },
    },
});

export const { setActiveItems, resetActiveItems, addActiveItem, removeActiveItem } = activeItemSlice.actions;

export const selectActiveItems = (state: RootState) => state.activeItem.activeItems;

export default activeItemSlice.reducer;
