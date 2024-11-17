import { Stack } from 'expo-router';

export default function StackNavigation() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ headerShown: false, headerTitle: '' }} />
            <Stack.Screen name="registration" options={{ headerShown: false, headerTitle: 'Register' }} />
            <Stack.Screen name="login" options={{ headerShown: false, headerTitle: 'Login' }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
            <Stack.Screen name="receipt/new" options={{ headerShown: true, headerTitle: 'Create Receipt' }} />
            <Stack.Screen name="receipt/[id]" options={{ headerShown: true, headerTitle: 'Receipt Details' }} />
            <Stack.Screen name="grocery/[id]" options={{ headerShown: true, headerTitle: 'Edit Grocery Item' }} />
        </Stack>
    );
}
