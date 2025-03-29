import { Stack } from 'expo-router';

export default function GroceryStack() {
    return (
        <Stack screenOptions={{ headerTitle: '' }}>
            <Stack.Screen name="modify/[id]" />
            <Stack.Screen name="create" />
        </Stack>
    );
}
