import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function DrawerNavigation() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen name="dashboard" options={{ title: 'Home' }} />
                <Drawer.Screen name="expiry" options={{ title: 'Expiring Groceries' }} />
                <Drawer.Screen name="expense" options={{ title: 'View Expenses' }} />
                <Drawer.Screen name="receipt" options={{ title: 'View Receipts' }} />
            </Drawer>
        </GestureHandlerRootView>
    );
}
