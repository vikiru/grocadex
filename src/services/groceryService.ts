import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GROCERY_ITEM_ROUTE } from '~constants/Routes';
import { GroceryItem } from '~types/index';
import { RequestPayload, ResponsePayload } from '~types/index';

import { deleteData, getData, postData, putData } from './general';

function useCreateGroceryItemMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<GroceryItem>,
        Error,
        RequestPayload<GroceryItem>
    >({
        mutationFn: async (newItem) => {
            const response = await postData<ResponsePayload<GroceryItem>>({
                url: GROCERY_ITEM_ROUTE,
                data: newItem,
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
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to create grocery item:', error.message);
        },
    });
}

function useDeleteGroceryItemMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<null>,
        Error,
        RequestPayload<{ id: string }>
    >({
        mutationFn: async ({ id }) => {
            const response = await deleteData<ResponsePayload<null>>({
                url: `${GROCERY_ITEM_ROUTE}/${id}`,
            });

            if (!response) {
                throw new Error(
                    'Failed to delete grocery item: No response data.',
                );
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to delete grocery item:', error.message);
        },
    });
}

function useRetrieveGroceryItemsQuery() {
    return useQuery<ResponsePayload<GroceryItem[]>, Error>({
        queryKey: ['groceryItems'],
        queryFn: async () => {
            const response = await getData<ResponsePayload<GroceryItem[]>>({
                url: GROCERY_ITEM_ROUTE,
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

function useUpdateGroceryItemMutation() {
    const queryClient = useQueryClient();

    return useMutation<
        ResponsePayload<GroceryItem>,
        Error,
        RequestPayload<GroceryItem>
    >({
        mutationFn: async (updatedItem) => {
            const response = await putData<ResponsePayload<GroceryItem>>({
                url: `${GROCERY_ITEM_ROUTE}/${updatedItem.data!.id}`,
                data: updatedItem.data,
            });

            if (!response) {
                throw new Error(
                    'Failed to update grocery item: No response data.',
                );
            }

            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['groceryItems'],
            });
        },
        onError: (error) => {
            console.error('Failed to update grocery item:', error.message);
        },
    });
}

export {
    useCreateGroceryItemMutation,
    useDeleteGroceryItemMutation,
    useRetrieveGroceryItemsQuery,
    useUpdateGroceryItemMutation,
};
