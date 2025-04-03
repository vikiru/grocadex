import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { FRONTEND_DASHBOARD_ROUTE } from '~constants/Routes';
import { useLoginMutation } from '~services';

export default function useLogin() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useLoginMutation();

    const login = async (values: { username: string; password: string }) => {
        try {
            const data = await mutateAsync({
                username: values.username,
                password: values.password,
            });

            console.log(data.message);

            if (data.success) {
                const responseData = data.data;
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully logged in',
                    text2: `Welcome back, ${responseData.firstName} ${responseData.lastName}`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push(FRONTEND_DASHBOARD_ROUTE), 1500);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Login failed',
                text2: 'An error occurred during login. Please verify your credentials.',
                autoHide: true,
                visibilityTime: 2000,
            });
            console.error('Login failed:', error);
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

    return {
        error,
        login,
        handleLogin,
        handleCancel,
        isIdle,
        isPending,
        isError,
        isSuccess,
    };
}
