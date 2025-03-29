import { Stack } from 'expo-router';
import AuthStack from '~navigation/AuthStack';
import { useUserStore } from '~store/userStore';

export default function MainNavigation() {
    const user = useUserStore((state) => state.user);

    return (
        <>
            {!user && <AuthStack />}{' '}
            {user && (
                <Stack>
                    <Stack.Screen
                        name="auth"
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false, headerTitle: '' }}
                    />
                    <Stack.Screen
                        name="grocery"
                        options={{ headerShown: false, headerTitle: '' }}
                    />
                    <Stack.Screen
                        name="receipt"
                        options={{ headerShown: false, headerTitle: '' }}
                    />
                </Stack>
            )}
        </>
    );
}
