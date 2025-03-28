import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { useCreateUserMutation } from '~services/userService';

export function useRegistration() {
    const router = useRouter();
    const { mutateAsync, error, isIdle, isPending, isError, isSuccess } =
        useCreateUserMutation();

    const register = async (values: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
    }) => {
        try {
            const data = await mutateAsync({
                firstName: values.firstName,
                lastName: values.lastName,
                username: values.username,
                email: values.email,
                password: values.password,
            });

            if (data.success) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Successfully signed up',
                    text2: `You’re on your way to reducing food waste and saving money!`,
                    autoHide: true,
                    visibilityTime: 2000,
                });
                setTimeout(() => router.push('/'), 1500);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Signup failed',
                    text2: 'An error occurred during signup. Please try again.',
                    autoHide: true,
                    visibilityTime: 2000,
                });
                console.error('Signup failed:', error);
            }
        } catch (error) {
            console.error('Error during signup:', error);
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

    return {
        register,
        handleSignup,
        handleCancel,
        isIdle,
        isPending,
        isError,
        isSuccess,
    };
}
