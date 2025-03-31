import { Stack } from 'expo-router';

export default function AuthStack() {
    return (
        <Stack>
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="receipt" options={{ headerShown: false }} />
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
                name="login"
                options={{ headerShown: true, headerTitle: '' }}
            />
            <Stack.Screen
                name="signup"
                options={{ headerShown: true, headerTitle: '' }}
            />
        </Stack>
    );
}
