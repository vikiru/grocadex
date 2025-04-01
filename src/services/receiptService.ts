import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RECEIPT_ROUTE } from '~constants/Routes';
import { deleteData, getData, postData, putData } from '~services';
import { useGroceryStore, useReceiptStore, useUserStore } from '~store';
import { GroceryItem, Receipt, ResponsePayload } from '~types';
import { sortActiveItems, sortReceipts } from '~utils/date';

export function useCreateReceiptMutation() {
    const queryClient = useQueryClient();
    const { addGroceryItem } = useGroceryStore();
    const { addReceipt } = useReceiptStore();
    const { user } = useUserStore();

    return useMutation<
        ResponsePayload<Receipt>,
        Error,
        Receipt | Omit<Receipt, 'id'>
    >({
        mutationFn: async (newReceipt: Receipt | Omit<Receipt, 'id'>) => {
            if (user) {
                newReceipt.userId = user.id!;
            }

            const response = await postData<ResponsePayload<Receipt>>({
                url: RECEIPT_ROUTE,
                data: newReceipt,
            });

            if (!response) {
                throw new Error('Failed to create receipt: No response data.');
            }

            return response;
        },
        onSuccess: async (data: ResponsePayload<Receipt>) => {
            const groceryItems = data.data.groceryItems as GroceryItem[];
            const receipt = data.data;
            addReceipt(receipt);
            groceryItems.forEach((groceryItem: GroceryItem) => {
                addGroceryItem(groceryItem);
            });
            sortActiveItems(useGroceryStore.getState().groceryItems);
            sortReceipts(useReceiptStore.getState().receipts);
            queryClient.invalidateQueries({
                queryKey: ['dashboard'],
                refetchType: 'none',
            });
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: (error) => {
            console.error('Failed to create receipt:', error.message);
        },
    });
}

export function useDeleteReceiptMutation() {
    const queryClient = useQueryClient();
    const { getReceipts, setReceipts } = useReceiptStore();
    const { getGroceryItems, setGroceryItems } = useGroceryStore();

    return useMutation<ResponsePayload<null>, Error, number>({
        mutationFn: async (id: number) => {
            const response = await deleteData<ResponsePayload<null>>({
                url: `${RECEIPT_ROUTE}/${id}`,
            });

            if (!response) {
                throw new Error('Failed to delete receipt: No response data.');
            }

            return response;
        },
        onSuccess: async (data: ResponsePayload<null>, variables) => {
            setReceipts(
                getReceipts().filter((receipt) => receipt.id !== variables),
            );
            setGroceryItems(
                getGroceryItems().filter(
                    (groceryItem) => groceryItem.receiptId !== variables,
                ),
            );
            queryClient.invalidateQueries({
                queryKey: ['dashboard'],
                refetchType: 'none',
            });
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: async (error) => {
            console.error('Failed to delete receipt:', error.message);
        },
    });
}

export function useRetrieveReceiptsQuery() {
    return useQuery<ResponsePayload<Receipt[]>, Error>({
        queryKey: ['receipts'],
        queryFn: async () => {
            const response = await getData<ResponsePayload<Receipt[]>>({
                url: RECEIPT_ROUTE,
            });

            if (!response) {
                throw new Error(
                    'Failed to retrieve receipts: No response data.',
                );
            }

            return response;
        },
    });
}

export function useUpdateReceiptMutation() {
    const queryClient = useQueryClient();
    const { getGroceryItems, setGroceryItems, addGroceryItem } =
        useGroceryStore();
    const { updateReceipt } = useReceiptStore();

    return useMutation<ResponsePayload<Receipt>, Error, Receipt>({
        mutationFn: async (updatedReceipt: Receipt) => {
            const response = await putData<ResponsePayload<Receipt>>({
                url: `${RECEIPT_ROUTE}/${updatedReceipt.id}`,
                data: updatedReceipt,
            });

            if (!response) {
                throw new Error('Failed to update receipt: No response data.');
            }

            return response;
        },
        onSuccess: async (data: ResponsePayload<Receipt>, variables) => {
            updateReceipt(variables.id!, data.data);
            const groceryItems = data.data.groceryItems as GroceryItem[];
            setGroceryItems(
                getGroceryItems().filter(
                    (groceryItem) => groceryItem.receiptId !== variables.id,
                ),
            );
            groceryItems.forEach((groceryItem: GroceryItem) => {
                addGroceryItem(groceryItem);
            });
            queryClient.invalidateQueries({
                queryKey: ['dashboard'],
                refetchType: 'none',
            });
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: (error) => {
            console.error('Failed to update receipt:', error.message);
        },
    });
}
