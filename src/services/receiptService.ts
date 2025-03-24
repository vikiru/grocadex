import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { RECEIPT_ROUTE } from '~constants/Routes';
import { Receipt } from '~types/index';
import { RequestPayload, ResponsePayload } from '~types/index';

import { deleteData, getData, postData, putData } from './general';

function useCreateReceiptMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Receipt>,
        Error,
        RequestPayload<Receipt>
    >({
        mutationFn: async (newReceipt) => {
            const response = await postData<ResponsePayload<Receipt>>({
                url: RECEIPT_ROUTE,
                data: newReceipt,
            });

            if (!response) {
                throw new Error('Failed to create receipt: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: (error) => {
            console.error('Failed to create receipt:', error.message);
        },
    });
}

function useDeleteReceiptMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<null>,
        Error,
        RequestPayload<{ id: string }>
    >({
        mutationFn: async ({ id }) => {
            const response = await deleteData<ResponsePayload<null>>({
                url: `${RECEIPT_ROUTE}/${id}`,
            });

            if (!response) {
                throw new Error('Failed to delete receipt: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: (error) => {
            console.error('Failed to delete receipt:', error.message);
        },
    });
}

function useRetrieveReceiptsQuery() {
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

function useUpdateReceiptMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Receipt>,
        Error,
        RequestPayload<Receipt>
    >({
        mutationFn: async (updatedReceipt) => {
            const response = await putData<ResponsePayload<Receipt>>({
                url: `${RECEIPT_ROUTE}/${updatedReceipt.data!.id}`,
                data: updatedReceipt.data,
            });

            if (!response) {
                throw new Error('Failed to update receipt: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['receipts'],
            });
        },
        onError: (error) => {
            console.error('Failed to update receipt:', error.message);
        },
    });
}

export {
    useCreateReceiptMutation,
    useDeleteReceiptMutation,
    useRetrieveReceiptsQuery,
    useUpdateReceiptMutation,
};
