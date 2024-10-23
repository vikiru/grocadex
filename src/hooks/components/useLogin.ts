import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePostData } from '~hooks/api/usePostData';
import { useUser } from '~hooks/redux/useUser';
import { RequestPayload } from '~types/RequestPayload';

export function useLogin() {
    const { updateUser } = useUser();
    const { postData } = usePostData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const login = async (values: { username: string; password: string }) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
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
                setTimeout(() => router.push('/dashboard'), 1500);
                return { success: true };
            } else {
                setError(new Error('Login failed. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleLogin = async (values: { username: string; password: string }) => {
        await login(values);
    };

    const handleCancel = () => {
        router.push('/');
    };

    return { login, handleLogin, handleCancel, loading, error };
}
