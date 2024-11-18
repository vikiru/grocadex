import { FRONTEND_DASHBOARD_ROUTE, FRONTEND_EXPIRY_ROUTE } from '~constants/Routes';
import { useDeleteData, usePutData } from '~hooks/api';
import { useActiveItem, useUser } from '~hooks/redux';
import { GroceryItem, RequestPayload } from '~types/index';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';

export default function useItem() {
    const { user } = useUser();
    const { putData } = usePutData();
    const { deleteData } = useDeleteData();
    const { removeItem, updateItem } = useActiveItem();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleUpdate = async (groceryItem: GroceryItem) => {
        setLoading(true);
        setError(null);
        const { receiptId } = groceryItem;
        const groceryItemId = groceryItem?.id;

        const payload: RequestPayload = {
            url: `${process.env.EXPO_PUBLIC_API_URL}/receipts/${receiptId}/groceries/${groceryItemId}`,
            data: { groceryItem },
        };

        try {
            const response = await putData(payload);
            if (response?.status === 200) {
                const { data } = response.data;
                groceryItem.expiryDate = new Date(groceryItem.expiryDate).toISOString();
                updateItem(groceryItem);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully updated item',
                    text2: 'Updated items with the new provided values',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push(FRONTEND_DASHBOARD_ROUTE), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(new Error('Failed to update item, please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleDelete = async (receiptId: number, groceryItemId: number) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `${process.env.EXPO_PUBLIC_API_URL}/receipts/${receiptId}/groceries/${groceryItemId}`,
            data: { userId: user?.id, receiptId, groceryItemId },
        };

        try {
            const response = await deleteData(payload);
            if (response?.status === 200) {
                removeItem(groceryItemId);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully deleted item',
                    text2: 'Deleted the selected item from your active items',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push(FRONTEND_EXPIRY_ROUTE), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(new Error('Failed to delete item. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    return { handleUpdate, handleDelete, loading, error };
}
