import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EXPENSE_ROUTE } from '~constants/Routes';
import { deleteData, getData, postData, putData } from '~services';
import { Expense, RequestPayload, ResponsePayload } from '~types';

export function useCreateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Expense>,
        Error,
        RequestPayload<Expense>
    >({
        mutationFn: async (newExpense) => {
            const response: ResponsePayload = await postData<
                ResponsePayload<Expense>
            >({
                url: EXPENSE_ROUTE,
                data: newExpense,
            });

            if (!response) {
                throw new Error('Failed to create expense: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['expenses'],
            });
        },
        onError: (error) => {
            console.error('Failed to create expense:', error.message);
        },
    });
}

export function useDeleteExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<null>,
        Error,
        RequestPayload<{ id: string }>
    >({
        mutationFn: async ({ id }) => {
            const response: ResponsePayload = await deleteData<
                ResponsePayload<null>
            >({
                url: `${EXPENSE_ROUTE}/${id}`,
            });

            if (!response) {
                throw new Error('Failed to delete expense: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['expenses'],
            });
        },
        onError: (error) => {
            console.error('Failed to delete expense:', error.message);
        },
    });
}

export function useRetrieveExpensesQuery() {
    return useQuery<ResponsePayload<Expense[]>, Error>({
        queryKey: ['expenses'],
        queryFn: async () => {
            const response: ResponsePayload = await getData<
                ResponsePayload<Expense[]>
            >({
                url: EXPENSE_ROUTE,
            });

            if (!response) {
                throw new Error(
                    'Failed to retrieve expenses: No response data.',
                );
            }

            return response;
        },
    });
}

export function useUpdateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Expense>,
        Error,
        RequestPayload<Expense>
    >({
        mutationFn: async (updatedExpense) => {
            const response: ResponsePayload = await putData<
                ResponsePayload<Expense>
            >({
                url: `${EXPENSE_ROUTE}/${updatedExpense.data!.id}`,
                data: updatedExpense.data,
            });

            if (!response) {
                throw new Error('Failed to update expense: No response data.');
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['expenses'],
            });
        },
        onError: (error) => {
            console.error('Failed to update expense:', error.message);
        },
    });
}
