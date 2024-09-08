import { createSlice } from '@reduxjs/toolkit';
import { GroceryItem } from '../types/GroceryItem';

interface GroceryItemState {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
}

const initialState: GroceryItemState = {
    groceryItems: [],
};

const groceryItemSlice = createSlice({
    name: 'groceryItem',
    initialState,
    reducers: {
        setGroceryItems: (state, action) => {
            state.groceryItems = action.payload;
        },
        resetGroceryItems: (state) => {
            state.groceryItems = [];
        },
        addGroceryItem: (state, action) => {
            state.groceryItems.push(action.payload);
        },
        removeGroceryItem: (state, action) => {
            state.groceryItems = state.groceryItems.filter((item) => item.id !== action.payload);
        },
    },
});

export const { setGroceryItems, resetGroceryItems, addGroceryItem, removeGroceryItem } = groceryItemSlice.actions;

export default groceryItemSlice.reducer;
