import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';
import { Receipt } from '../types/Receipt';

interface ReceiptState {
    receipts: Receipt[] | Partial<Receipt>[];
}

const initialState: ReceiptState = {
    receipts: [],
};

const receiptSlice = createSlice({
    name: 'receipt',
    initialState,
    reducers: {
        setReceipts: (state, action) => {
            state.receipts = action.payload;
        },
        resetReceipts: (state) => {
            state.receipts = [];
        },
        addReceipt: (state, action) => {
            state.receipts.push(action.payload);
        },
        removeReceipt: (state, action) => {
            state.receipts = state.receipts.filter((receipt) => receipt.id !== action.payload);
        },
    },
});

export const { setReceipts, resetReceipts, addReceipt, removeReceipt } = receiptSlice.actions;

export const selectReceipts = (state: RootState) => state.receipt.receipts;

export default receiptSlice.reducer;
