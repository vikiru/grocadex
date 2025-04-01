import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Button } from '~components/ui';

export default function TabNavigation() {
    const router = useRouter();
    return (
        <Tabs
            screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: 'Home',
                    headerTitleStyle: { fontSize: 32 },
                    headerRight: () => (
                        <Button
                            action="primary"
                            className="data-[active=true]:bg-backgroound-0 bg-background-0 data-[hover=true]:bg-background-0"
                            onPress={() => router.push('/settings')}
                            variant="solid"
                        >
                            <MaterialCommunityIcons
                                color="black"
                                name="cog"
                                size={24}
                                style={{ marginRight: 24 }}
                            />
                        </Button>
                    ),
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
                    headerTitleStyle: { fontSize: 32 },
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
                    headerTitleStyle: { fontSize: 32 },
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
                    headerTitleStyle: { fontSize: 32 },
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
