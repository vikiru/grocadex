import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDeleteData } from '~hooks/api/useDeleteData';
import usePostData from '~hooks/api/usePostData';
import { usePutData } from '~hooks/api/usePutData';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useReceipt } from '~hooks/redux/useReceipt';
import { useUser } from '~hooks/redux/useUser';
import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';
import { RequestPayload } from '~types/RequestPayload';

// TODO: cleanup this and the redux slices/hooks. Make sure all post routes return the created item(s)
export default function useReceipts() {
    const { user } = useUser();
    const { postData } = usePostData();
    const { putData } = usePutData();
    const { deleteData } = useDeleteData();
    const { createReceipt, deleteReceipt, modifyReceipt } = useReceipt();
    const { addMultipleItems, removeItemsByReceiptId } = useActiveItem();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleCreate = async ({
        store: store,
        purchaseDate: purchaseDate,
        total: total,
        groceryItems: groceryItems,
    }: {
        store: string;
        purchaseDate: Date;
        total: number;
        groceryItems: GroceryItem[];
    }) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/receipts/`,
            data: { userId: user?.id, store, purchaseDate, total, groceryItems },
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
                setError(new Error('Failed to update receipt, please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleUpdate = async (receiptId: number, receipt: Receipt) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/receipts/${receiptId}`,
            data: { userId: user?.id, receiptId, updatedFields: receipt },
        };

        try {
            const response = await putData(payload);
            if (response?.status === 200) {
                modifyReceipt(receiptId, receipt);
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
                setError(new Error('Failed to update receipt, please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleDelete = async (receiptId: number) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/receipts/${receiptId}`,
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
                setError(new Error('Failed to delete receipt. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    return { handleCreate, handleUpdate, handleDelete, loading, error };
}
