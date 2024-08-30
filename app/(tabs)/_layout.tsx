import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarLabelPosition: 'below-icon',
            }}
        >
            <Tabs.Screen
                name="expense"
                options={{
                    headerTitle: 'Expenses',
                    headerShown: false,
                    tabBarLabel: 'Expenses',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cash" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="receipt"
                options={{
                    headerTitle: 'Receipts',
                    headerShown: false,
                    tabBarLabel: 'Receipts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="receipt" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="dashboard"
                options={{
                    headerTitle: 'Home',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#000' },
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="expiry"
                options={{
                    headerTitle: 'Expiry',
                    headerShown: false,
                    tabBarLabel: 'Expiry',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
