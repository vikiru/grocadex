import { ExpiryScreen, GroceryItemEditScreen } from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function ExpiryStack() {
    return (
        <Stack.Navigator initialRouteName="expiry">
            <Stack.Screen name="expiry" component={ExpiryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="grocery" component={GroceryItemEditScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
