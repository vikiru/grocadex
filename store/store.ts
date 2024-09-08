import { configureStore } from '@reduxjs/toolkit';
import activeItemReducer from '../slices/activeItemSlice';
import dateReducer from '../slices/dateSlice';
import expenseReducer from '../slices/expenseSlice';
import groceryReducer from '../slices/groceryItemSlice';
import receiptReducer from '../slices/receiptSlice';
import userReducer from '../slices/userSlice';

export const store = configureStore({
    reducer: {
        activeItem: activeItemReducer,
        receipt: receiptReducer,
        grocery: groceryReducer,
        user: userReducer,
        date: dateReducer,
        expense: expenseReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
