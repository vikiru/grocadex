import { DashboardScreen, GroceryItemEditScreen } from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
    return (
        <Stack.Navigator initialRouteName="dashboard">
            <Stack.Screen name="dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <Stack.Screen name="grocery" component={GroceryItemEditScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
