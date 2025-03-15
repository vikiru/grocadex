import { BASE_URL, RECEIPT_ROUTE } from '~constants/Routes';
import { useDeleteData, usePostData, usePutData } from '~hooks/api';
import { useActiveItem, useReceipt, useUser } from '~hooks/redux';
import { Receipt, RequestPayload } from '~types/index';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function useReceipts() {
    const { user } = useUser();
    const { postData } = usePostData();
    const { putData } = usePutData();
    const { deleteData } = useDeleteData();
    const { createReceipt, modifyReceipt, deleteReceipt } = useReceipt();
    const {
        addMultipleItems,
        updateActiveItemsByReceiptId,
        removeItemsByReceiptId,
    } = useActiveItem();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleCreate = async (receipt: Receipt | Partial<Receipt>) => {
        setLoading(true);
        setError(null);

        const { store, purchaseDate, total, groceryItems } = receipt;

        const payload: RequestPayload = {
            url: RECEIPT_ROUTE,
            data: {
                userId: user?.id,
                store,
                purchaseDate,
                total,
                groceryItems,
            },
        };

        try {
            const response = await postData(payload);
            if (response?.status === 201) {
                const { data } = response.data;
                createReceipt(data);
                addMultipleItems(data.groceryItems);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully created receipt',
                    text2: 'Created receipt with the provided values',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push(`/receipt/${data.id}`), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(
                    new Error('Failed to update receipt, please try again.'),
                );
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleUpdate = async (receipt: Receipt) => {
        setLoading(true);
        setError(null);

        const { groceryItems, ...receiptData } = receipt;

        const payload: RequestPayload = {
            url: `${BASE_URL}/receipts/${receipt.id}`,
            data: { receipt: receiptData, groceryItems },
        };

        try {
            //TODO: ensure time data is converted to string before storing.
            const response = await putData(payload);
            if (response?.status === 200) {
                const responseData = response.data;
                const receipt = responseData.data;
                modifyReceipt(receipt);
                updateActiveItemsByReceiptId(receipt.id, receipt.groceryItems);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully updated receipt',
                    text2: 'Updated receipt with the new provided values',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/receipt'), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(
                    new Error('Failed to update receipt, please try again.'),
                );
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleDelete = async (receiptId: number) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `${BASE_URL}/receipts/${receiptId}`,
            data: { userId: user?.id, receiptId },
        };

        try {
            const response = await deleteData(payload);
            if (response?.status === 200) {
                setTimeout(() => router.push(`/receipt`), 200);
                deleteReceipt(receiptId);
                removeItemsByReceiptId(receiptId);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully deleted receipt',
                    text2: 'Deleted the selected receipt from your account',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setLoading(false);
                return { success: true };
            } else {
                setError(
                    new Error('Failed to delete receipt. Please try again.'),
                );
            }
        } catch (error) {
            return { success: false };
        }
    };

    return { handleCreate, handleUpdate, handleDelete, loading, error };
}
