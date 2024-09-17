import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useDeleteData } from '~hooks/api/useDeleteData';
import { usePutData } from '~hooks/api/usePutData';
import { useReceipt } from '~hooks/redux/useReceipt';
import { useUser } from '~hooks/redux/useUser';
import { removeReceipt } from '~slices/receiptSlice';
import { Receipt } from '~types/Receipt';
import { RequestPayload } from '~types/RequestPayload';

export default function useReceipts() {
    const { user } = useUser();
    const { putData } = usePutData();
    const { deleteData } = useDeleteData();
    const { deleteReceipt, updateReceipt } = useReceipt();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const handleEdit = async (receiptId: number, receipt: Receipt) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/receipts/${receiptId}`,
            data: { userId: user?.id, receiptId, updatedFields: receipt },
        };

        try {
            const response = await putData(payload);
            if (response?.status === 200) {
                updateReceipt(receiptId, receipt);
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
                removeReceipt(receiptId);
                Toast.show({
                    type: 'success',
                    text1: 'Successfully deleted receipt',
                    text2: 'Deleted the selected receipt from your account',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/receipt'), 1500);
                setLoading(false);
                return { success: true };
            } else {
                setError(new Error('Failed to delete receipt. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    return { handleEdit, handleDelete, loading, error };
}
