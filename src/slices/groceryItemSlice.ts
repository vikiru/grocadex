import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '~store/store';
import { GroceryItem } from '~types/index';

type GroceryItemState = {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
};

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
        updateGroceryItem: (state, action) => {
            const { receiptId, groceryItemId, updatedItem } = action.payload;
            const index = state.groceryItems.findIndex(
                (item) => item.id === groceryItemId && item.receiptId === receiptId,
            );
            if (index !== -1) {
                state.groceryItems[index] = {
                    ...state.groceryItems[index],
                    ...updatedItem,
                };
            }
        },
    },
});

export const { setGroceryItems, resetGroceryItems, addGroceryItem, removeGroceryItem, updateGroceryItem } =
    groceryItemSlice.actions;

export const selectGroceryItems = (state: RootState) => state.grocery.groceryItems;

export default groceryItemSlice.reducer;
