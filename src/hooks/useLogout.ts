import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useLogoutMutation } from '~services';

export default function useLogout() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useLogoutMutation();

    const handleLogout = async () => {
        try {
            const data = await mutateAsync();
            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully logged out',
                    text2: `You've been logged out. See you next time!`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/'), 1500);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Logout failed',
                    text2: 'An error occurred during logout. Please try again.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Logout failed:', error);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return { handleLogout, error, isIdle, isPending, isError, isSuccess };
}
