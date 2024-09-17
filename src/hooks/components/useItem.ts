import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDeleteData } from '~hooks/api/useDeleteData';
import { usePutData } from '~hooks/api/usePutData';
import { useGrocery } from '~hooks/redux/useGrocery';
import { useUser } from '~hooks/redux/useUser';
import { GroceryItem } from '~types/GroceryItem';
import { RequestPayload } from '~types/RequestPayload';

export default function useItem() {
    const { user } = useUser();
    const { putData } = usePutData();
    const { deleteData } = useDeleteData();
    const { removeItem, updateItem } = useGrocery();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleEdit = async (receiptId: number, groceryItem: GroceryItem) => {
        setLoading(true);
        setError(null);
        const groceryItemId = groceryItem?.id;

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/receipts/${receiptId}/groceries/${groceryItemId}`,
            data: { userId: user?.id, receiptId, groceryId: groceryItem?.id, updatedFields: groceryItem },
        };

        try {
            const response = await putData(payload);
            if (response?.status === 200) {
                updateItem(receiptId, groceryItem.id, groceryItem);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully updated item',
                    text2: 'Updated items with the new provided values',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/expiry'), 1500);
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
            url: `http://10.0.0.168:3000/api/v1/receipts/${receiptId}/groceries/${groceryItemId}`,
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
                setTimeout(() => router.push('/expiry'), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(new Error('Failed to delete item. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    return { handleEdit, handleDelete, loading, error };
}
