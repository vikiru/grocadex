import { useDispatch, useSelector } from 'react-redux';
import {
    addReceipt,
    removeReceipt,
    resetReceipts,
    selectReceipts,
    setReceipts,
    updateReceipt,
} from '~slices/receiptSlice';

import { Receipt } from '~types/index';
import { sortReceipts } from '~utils/date';

export const useReceipt = () => {
    const receipts = useSelector(selectReceipts);
    const dispatch = useDispatch();

    const setReceiptValues = (receipts: Receipt[]) => {
        sortReceipts(receipts);
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

    const modifyReceipt = (receipt: Receipt) => {
        dispatch(updateReceipt(receipt));
    };

    return {
        receipts,
        setReceiptValues,
        removeReceipts,
        createReceipt,
        deleteReceipt,
        modifyReceipt,
    };
};
