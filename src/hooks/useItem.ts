import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import {
    useDeleteGroceryItemMutation,
    useUpdateGroceryItemMutation,
} from '~services/groceryService';
import { GroceryItem } from '~types/GroceryItem';

export function useDeleteItem() {
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useDeleteGroceryItemMutation();

    const handleDelete = async (
        id: number,
        receiptId: number,
    ): Promise<void> => {
        try {
            const data = await mutateAsync({ id, receiptId });
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully deleted item',
                    text2: `Your item has been deleted successfully.`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Delete Item failed',
                    text2: 'An error occurred during deleting item.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
            }
        } catch (error) {
            console.error('Failed to delete item:', error);
        }
    };

    return {
        handleDelete,
        mutateAsync,
        error,
        isIdle,
        isPending,
        isError,
        isSuccess,
    };
}

export function useUpdateItem() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useUpdateGroceryItemMutation();

    const handleUpdate = async (updatedItem: GroceryItem): Promise<void> => {
        try {
            const data = await mutateAsync(updatedItem);
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully updated item',
                    text2: `Your item has been updated successfully.`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.back(), 1500);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Update Item failed',
                    text2: 'An error occurred during updating item.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Update failed:', error);
            }
        } catch (error) {
            console.error('Failed to update item:', error);
        }
    };

    return {
        handleUpdate,
        error,
        isIdle,
        isPending,
        isError,
        isSuccess,
    };
}
