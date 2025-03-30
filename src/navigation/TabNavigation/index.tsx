import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabNavigation() {
    return (
        <Tabs
            screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            color={color}
                            name="home"
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="grocery"
                options={{
                    title: 'Groceries',
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            color={color}
                            name="calendar"
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="receipt"
                options={{
                    title: 'Receipt',
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            color={color}
                            name="receipt"
                            size={24}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    title: 'Expenses',
                    tabBarLabel: '',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons
                            color={color}
                            name="cash"
                            size={24}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
