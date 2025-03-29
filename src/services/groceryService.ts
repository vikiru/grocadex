import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RECEIPT_ROUTE } from '~constants/Routes';
import { deleteData, getData, postData, putData } from '~services';
import { useGroceryStore } from '~store';
import { GroceryItem, ResponsePayload } from '~types';

export function useCreateGroceryItemMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<GroceryItem>,
        Error,
        GroceryItem | GroceryItem[]
    >({
        mutationFn: async (newGroceryItems: GroceryItem | GroceryItem[]) => {
            const receiptId = Array.isArray(newGroceryItems)
                ? newGroceryItems[0].receiptId
                : newGroceryItems.receiptId;
            const response = await postData<ResponsePayload<GroceryItem>>({
                url: `${RECEIPT_ROUTE}/${receiptId}/groceries`,
                data: newGroceryItems,
            });
            if (!response) {
                throw new Error(
                    'Failed to create grocery item: No response data.',
                );
            }
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dashboard'],
            });
            queryClient.invalidateQueries({
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to create grocery item:', error.message);
        },
    });
}

export function useDeleteGroceryItemMutation() {
    const queryClient = useQueryClient();
    const { getGroceryItems, setGroceryItems } = useGroceryStore();

    return useMutation<
        ResponsePayload<null>,
        Error,
        Pick<GroceryItem, 'id' | 'receiptId'>
    >({
        mutationFn: async ({ id, receiptId }) => {
            const response = await deleteData<ResponsePayload<null>>({
                url: `${RECEIPT_ROUTE}/${receiptId}/groceries/${id}`,
            });
            if (!response) {
                throw new Error(
                    'Failed to delete grocery item: No response data.',
                );
            }
            return response;
        },
        onSuccess: async (data: ResponsePayload<null>, variables) => {
            const items = getGroceryItems();
            setGroceryItems(
                getGroceryItems().filter((item) => item.id !== variables.id),
            );
            queryClient.invalidateQueries({
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to delete grocery item:', error.message);
        },
    });
}

export function useRetrieveGroceryItemsByReceiptQuery() {
    return useQuery<ResponsePayload<GroceryItem[]>, Error>({
        queryKey: ['groceryItems'],
        queryFn: async () => {
            const response = await getData<ResponsePayload<GroceryItem[]>>({
                url: `${RECEIPT_ROUTE}/groceries`,
            });

            if (!response) {
                throw new Error(
                    'Failed to retrieve grocery items: No response data.',
                );
            }

            return response;
        },
    });
}

export function useUpdateGroceryItemMutation() {
    const queryClient = useQueryClient();
    const { updateGroceryItem } = useGroceryStore();

    return useMutation<ResponsePayload<GroceryItem>, Error, GroceryItem>({
        mutationFn: async (updatedGroceryItem: GroceryItem) => {
            const response = await putData<ResponsePayload<GroceryItem>>({
                url: `${RECEIPT_ROUTE}/${updatedGroceryItem.receiptId}/groceries/${updatedGroceryItem.id}`,
                data: updatedGroceryItem,
            });
            if (!response) {
                throw new Error(
                    'Failed to update grocery item: No response data.',
                );
            }
            return response;
        },
        onSuccess: async (data: ResponsePayload<GroceryItem>) => {
            const updatedItem = data.data;
            updateGroceryItem(
                updatedItem.id!,
                updatedItem.receiptId,
                updatedItem,
            );
            queryClient.invalidateQueries({
                queryKey: ['dashboard'],
            });
            queryClient.invalidateQueries({
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to update grocery item:', error.message);
        },
    });
}
