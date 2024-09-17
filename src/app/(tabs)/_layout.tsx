import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyledComponent } from 'nativewind';
import React from 'react';

export default function TabsLayout() {
    return (
        <StyledComponent
            component={Tabs}
            screenOptions={{
                tabBarLabelPosition: 'below-icon',
                tabBarStyle: { backgroundColor: '#E8F5E9' },
                tabBarActiveTintColor: '#4CAF50',
                tabBarInactiveTintColor: '#9E9E9E',
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    headerTitle: 'User Dashboard',
                    headerShown: true,
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="home" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="expiry"
                options={{
                    headerTitle: 'Expiring Items',
                    headerShown: true,
                    tabBarLabel: 'Expiry',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="calendar-clock" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="expense"
                options={{
                    headerTitle: 'Expense Tracking',
                    headerShown: true,
                    tabBarLabel: 'Expenses',
                    tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cash" size={size} color={color} />,
                }}
            />
            <Tabs.Screen
                name="receipt"
                options={{
                    headerTitle: 'Receipts',
                    headerShown: true,
                    tabBarLabel: 'Receipts',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="receipt" size={size} color={color} />
                    ),
                }}
            />
        </StyledComponent>
    );
}
