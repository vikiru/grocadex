import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { FRONTEND_RECEIPT_ROUTE } from '~constants/Routes';
import {
    useCreateReceiptMutation,
    useDeleteReceiptMutation,
    useUpdateReceiptMutation,
} from '~services';
import { Receipt } from '~types';

export function useCreateReceipt() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useCreateReceiptMutation();

    const handleCreate = async (newReceipt: Receipt | Omit<Receipt, 'id'>) => {
        try {
            const data = await mutateAsync(newReceipt);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully created receipt',
                    text2: `Receipt created successfully.`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.replace(FRONTEND_RECEIPT_ROUTE), 1500);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Receipt creation failed',
                    text2: 'An error occurred during receipt creation.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Receipt creation failed:', error);
            }
        } catch (error) {
            console.error('Failed to create receipt:', error);
        }
    };
    return { handleCreate, error, isIdle, isPending, isError, isSuccess };
}

export function useDeleteReceipt() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useDeleteReceiptMutation();

    const handleDelete = async (id: number) => {
        try {
            const data = await mutateAsync(id);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully deleted receipt',
                    text2: `Receipt deleted successfully.`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Receipt delete failed',
                    text2: 'An error occurred during receipt deletion.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Receipt delete failed:', error);
            }
        } catch (error) {
            console.error('Failed to delete receipt:', error);
        }
    };
    return { handleDelete, error, isIdle, isPending, isError, isSuccess };
}

export function useUpdateReceipt() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useUpdateReceiptMutation();

    const handleUpdate = async (
        updatedReceipt: Receipt | Omit<Receipt, 'id'>,
    ) => {
        try {
            const data = await mutateAsync(updatedReceipt);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully updated receipt',
                    text2: `Receipt updated successfully.`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.replace(FRONTEND_RECEIPT_ROUTE), 1500);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Receipt update failed',
                    text2: 'An error occurred during receipt update.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Receipt update failed:', error);
            }
        } catch (error) {
            console.error('Failed to update receipt:', error);
        }
    };
    return { handleUpdate, error, isIdle, isPending, isError, isSuccess };
}
