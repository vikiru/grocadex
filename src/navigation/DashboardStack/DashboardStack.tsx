import {
    DashboardScreen,
    GroceryItemEditScreen,
    ReceiptCreateScreen,
} from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName="dashboard">
            <Stack.Screen
                component={DashboardScreen}
                name="dashboard"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={GroceryItemEditScreen}
                name="grocery"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={ReceiptCreateScreen}
                name="receipts/create"
                options={{ headerShown: true }}
            />
        </Stack.Navigator>
    );
}
