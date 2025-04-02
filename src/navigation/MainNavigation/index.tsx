import { Stack } from 'expo-router';
import { useMMKVListener } from 'react-native-mmkv';
import { useForceLogout } from '~hooks';
import { AuthStack } from '~navigation';
import { tokenStorage, useUserStore } from '~store';

export default function MainNavigation() {
    const user = useUserStore((state) => state.user);
    const { handleForceLogout } = useForceLogout();

    useMMKVListener((key) => {
        if (key !== 'isAuthenticated') return;
        else if (
            key === 'isAuthenticated' &&
            tokenStorage.getBoolean(key) === false &&
            tokenStorage.getBoolean('normalLogout') === false
        ) {
            console.log(`Value for "${key}" changed!`);
            handleForceLogout();
        }
    }, tokenStorage);

    return (
        <>
            {!user && <AuthStack />}
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
