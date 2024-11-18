import { useRouter } from 'expo-router';
import { useState } from 'react';
import Toast from 'react-native-toast-message';
import { LOGOUT_ROUTE } from '~constants/Routes';
import { usePostData } from '~hooks/api';
import { useUser } from '~hooks/redux';
import { RequestPayload } from '~types/index';

export default function useLogout() {
    const { deleteUser } = useUser();
    const { postData } = usePostData();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const logout = async () => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: LOGOUT_ROUTE,
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
