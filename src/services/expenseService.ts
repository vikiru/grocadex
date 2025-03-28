import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { EXPENSE_ROUTE } from '~constants/Routes';
import { deleteData, getData, postData, putData } from '~services/general';
import { Expense } from '~types/index';
import { RequestPayload, ResponsePayload } from '~types/index';

function useCreateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Expense>,
        Error,
        RequestPayload<Expense>
    >({
        mutationFn: async (newExpense) => {
            const response = await postData<ResponsePayload<Expense>>({
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

function useDeleteExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<null>,
        Error,
        RequestPayload<{ id: string }>
    >({
        mutationFn: async ({ id }) => {
            const response = await deleteData<ResponsePayload<null>>({
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

function useRetrieveExpensesQuery() {
    return useQuery<ResponsePayload<Expense[]>, Error>({
        queryKey: ['expenses'],
        queryFn: async () => {
            const response = await getData<ResponsePayload<Expense[]>>({
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

function useUpdateExpenseMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<Expense>,
        Error,
        RequestPayload<Expense>
    >({
        mutationFn: async (updatedExpense) => {
            const response = await putData<ResponsePayload<Expense>>({
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

export {
    useCreateExpenseMutation,
    useDeleteExpenseMutation,
    useRetrieveExpensesQuery,
    useUpdateExpenseMutation,
};
