import { useMutation, useQuery } from '@tanstack/react-query';
import {
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    USER_ROUTE,
} from '~constants/Routes';
import { getData, postData } from '~services/general';
import { useUserStore } from '~store/index';
import { RequestPayload, ResponsePayload } from '~types/index';
import { User } from '~types/index';
import {} from '~types/ResponsePayload';

export default function useDashboardQuery() {
    const { user } = useUserStore();
    return useQuery<
        ResponsePayload<Pick<User, 'groceryItems' | 'receipts' | 'expenses'>>,
        Error
    >({
        queryKey: ['dashboard'],
        queryFn: async () => {
            const response = await getData<
                ResponsePayload<
                    Pick<User, 'groceryItems' | 'receipts' | 'expenses'>
                >
            >({
                url: DASHBOARD_ROUTE,
                data: {
                    userId: user!.id,
                },
            });

            if (!response) {
                throw new Error(
                    'Failed to fetch dashboard data: No response data.',
                );
            }

            return response;
        },
        staleTime: Infinity,
        retry: false,
    });
}

function useCreateUserMutation() {
    const mutation = useMutation<
        ResponsePayload<User>,
        Error,
        Pick<User, 'firstName' | 'lastName' | 'email' | 'username' | 'password'>
    >({
        mutationFn: async ({
            firstName,
            lastName,
            email,
            username,
            password,
        }) => {
            const payload: RequestPayload<Partial<User>> = {
                url: USER_ROUTE,
                data: {
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                },
            };
            const response = await postData<ResponsePayload<User>>(payload);
            if (!response) {
                throw new Error('User creation failed: No response data.');
            }
            return response;
        },
        onError: (error: Error) => {
            console.error('Error during user creation:', error.message);
        },
    });
    return mutation;
}

function useLoginMutation() {
    const { setUser } = useUserStore();

    const mutation = useMutation<
        ResponsePayload<User>,
        Error,
        Pick<User, 'username' | 'password'>
    >({
        mutationFn: async ({ username, password }) => {
            const payload: RequestPayload<Partial<User>> = {
                url: LOGIN_ROUTE,
                data: {
                    username,
                    password,
                },
            };
            const response = await postData<ResponsePayload<User>>(payload);
            if (response?.success !== true) {
                throw new Error('Login failed: No response data.');
            }
            return response;
        },
        onSuccess: async (data: ResponsePayload<User>) => {
            if (data.success && data.data) {
                setUser(data.data);
            } else {
                console.error('Login failed:', data.error);
            }
        },
        onError: async (error: Error) => {
            console.error('Error during login:', error.message);
        },
    });

    return mutation;
}

function useLogoutMutation() {
    const { resetUser } = useUserStore();

    const mutation = useMutation<ResponsePayload<User>, Error, void>({
        mutationFn: async () => {
            const response = await postData<ResponsePayload<User>>({
                url: LOGOUT_ROUTE,
                data: [],
            });
            if (!response) {
                throw new Error('Logout failed: No response data.');
            }
            return response;
        },
        onSuccess: () => {
            resetUser();
        },
        onError: (error: Error) => {
            console.error('Error during logout:', error.message);
        },
    });
    return { mutation };
}

export { useCreateUserMutation, useLoginMutation, useLogoutMutation };
