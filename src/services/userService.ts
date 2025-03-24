import { useMutation } from '@tanstack/react-query';
import { LOGIN_ROUTE, LOGOUT_ROUTE, USER_ROUTE } from '~constants/Routes';
import { useUserStore } from '~store/index';
import { RequestPayload, ResponsePayload } from '~types/index';
import { User } from '~types/index';
import {} from '~types/ResponsePayload';

import { postData } from './general';

function useCreateUserMutation({
    firstName,
    lastName,
    username,
    email,
    password,
}: Partial<
    Pick<User, 'firstName' | 'lastName' | 'email' | 'username' | 'password'>
>) {
    const payload: RequestPayload<Partial<User>> = {
        url: USER_ROUTE,
        data: {
            firstName,
            lastName,
            username,
            email,
            password,
        },
    };

    const mutation = useMutation<ResponsePayload<User>, Error, void>({
        mutationFn: async () => {
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
    return { mutation };
}

function useLoginMutation(email: string, password: string) {
    const { setUser } = useUserStore();
    const payload: RequestPayload<Partial<User>> = {
        url: LOGIN_ROUTE,
        data: {
            email,
            password,
        },
    };

    const mutation = useMutation<ResponsePayload<User>, Error, void>({
        mutationFn: async () => {
            const response = await postData<ResponsePayload<User>>(payload);
            if (!response) {
                throw new Error('Login failed: No response data.');
            }
            return response;
        },
        onSuccess: (data: ResponsePayload<User>) => {
            if (data.success && data.data) {
                setUser(data.data);
            } else {
                console.error('Login failed:', data.error);
            }
        },
        onError: (error: Error) => {
            console.error('Error during login:', error.message);
        },
    });

    return { mutation };
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
