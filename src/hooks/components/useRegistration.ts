import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePostData } from '~hooks/api/usePostData';
import { RequestPayload } from '~types/RequestPayload';

export function useRegistration() {
    const { postData } = usePostData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const register = async (values: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }) => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/users`,
            data: values,
        };

        try {
            const response = await postData(payload);

            if (response?.status === 201) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully signed up',
                    text2: `You’re on your way to reducing food waste and saving money!`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/'), 1500);
                return { success: true };
            }
        } catch (error) {
            setError(new Error('User sign up failed. Please try again'));
            return { success: false };
        }
    };

    const handleSignup = async (values: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }) => {
        await register(values);
    };

    const handleCancel = () => {
        router.push('/');
    };

    return { register, handleSignup, handleCancel, loading, error };
}
