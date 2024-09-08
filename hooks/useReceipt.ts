import { useDispatch, useSelector } from 'react-redux';
import { addReceipt, removeReceipt, resetReceipts, selectReceipts, setReceipts } from '../slices/receiptSlice';

import { Receipt } from '../types/Receipt';

export const useReceipt = () => {
    const receipts = useSelector(selectReceipts);
    const dispatch = useDispatch();

    const setReceiptValues = (receipts: Receipt[]) => {
        dispatch(setReceipts(receipts));
    };

    const removeReceipts = () => {
        dispatch(resetReceipts());
    };

    const createReceipt = (receipt: Receipt) => {
        dispatch(addReceipt(receipt));
    };

    const deleteReceipt = (id: number) => {
        dispatch(removeReceipt(id));
    };

    return { receipts, setReceiptValues, removeReceipts, createReceipt, deleteReceipt };
};
