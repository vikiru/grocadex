import { ExpiryScreen, GroceryItemEditScreen } from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ExpiryStack() {
    return (
        <Stack.Navigator initialRouteName="expiry">
            <Stack.Screen
                component={ExpiryScreen}
                name="expiry"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={GroceryItemEditScreen}
                name="grocery"
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
