import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { usePostData } from '~hooks/api/usePostData';
import { useUser } from '~hooks/redux/useUser';
import { RequestPayload } from '~types/RequestPayload';

export function useLogout() {
    const { deleteUser } = useUser();
    const { postData } = usePostData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const logout = async () => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/auth/logout`,
            data: [],
        };

        try {
            const response = await postData(payload);

            if (response?.status === 200) {
                const data = response.data;
                const user = data.data;
                deleteUser();
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully logged out',
                    text2: `You’re now logged out. See you again soon!`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/'), 1500);
                return { success: true };
            } else {
                setError(new Error('Logout failed. Please try again.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleLogout = async () => {
        await logout();
    };

    const handleCancel = () => {
        router.push('/');
    };

    return { logout, handleLogout, handleCancel, loading, error };
}
