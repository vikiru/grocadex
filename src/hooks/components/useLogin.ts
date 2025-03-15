import { FRONTEND_DASHBOARD_ROUTE, LOGIN_ROUTE } from '~constants/Routes';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePostData } from '~hooks/api';
import { useUser } from '~hooks/redux';
import { RequestPayload } from '~types/index';

export default function useLogin() {
    const { updateUser } = useUser();
    const { postData } = usePostData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (values: { username: string; password: string }) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: LOGIN_ROUTE,
            data: values,
        };

        try {
            const response = await postData(payload);

            if (response?.status === 200) {
                const data = response.data;
                const user = data.data;
                updateUser(user);
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully logged in',
                    text2: `Welcome back, ${user.firstName} ${user.lastName}`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push(FRONTEND_DASHBOARD_ROUTE), 1500);
                return { success: true };
            } else {
                setError(new Error('Login failed. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleLogin = async (values: {
        username: string;
        password: string;
    }) => {
        await login(values);
    };

    const handleCancel = () => {
        router.push('/');
    };

    return { login, handleLogin, handleCancel, loading, error };
}
