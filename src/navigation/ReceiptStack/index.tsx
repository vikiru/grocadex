import { Stack } from 'expo-router';

export default function ReceiptStack() {
    return (
        <Stack>
            <Stack.Screen
                name="(tabs)/receipt"
                options={{ headerShown: false }}
            />
            <Stack.Screen name="create" options={{ headerTitle: '' }} />
            <Stack.Screen name="[id]" options={{ headerTitle: '' }} />
            <Stack.Screen name="modify/[id]" options={{ headerTitle: '' }} />
        </Stack>
    );
}
