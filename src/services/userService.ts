import { useMutation, useQuery } from '@tanstack/react-query';
import {
    DASHBOARD_ROUTE,
    LOGIN_ROUTE,
    LOGOUT_ROUTE,
    USER_ROUTE,
} from '~constants/Routes';
import { useResetData } from '~hooks';
import { getData, postData } from '~services';
import { tokenStorage, useUserStore } from '~store';
import { RequestPayload, ResponsePayload, User } from '~types';

export function useCreateUserMutation() {
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

export function useDashboardQuery() {
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

export function useLoginMutation() {
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
                const user = data.data;
                const accessToken = data.access_token!;
                const refreshToken = data.refresh_token!;
                setUser(user);
                tokenStorage.set('isAuthenticated', true);
                tokenStorage.set('accessToken', accessToken);
                tokenStorage.set('refreshToken', refreshToken);
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

export function useLogoutMutation() {
    const { resetData } = useResetData();

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
            tokenStorage.set('normalLogout', true);
            resetData();
            tokenStorage.set('normalLogout', false);
        },
        onError: (error: Error) => {
            console.error('Error during logout:', error.message);
        },
    });
    return mutation;
}
