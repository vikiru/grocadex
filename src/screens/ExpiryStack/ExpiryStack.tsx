import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExpiryScreen from '~screens/ExpiryScreen/ExpiryScreen';
import GroceryItemEditScreen from '~screens/GroceryItemEditScreen/GroceryItemEditScreen';

const Stack = createNativeStackNavigator();

export default function ExpiryStack() {
    return (
        <Stack.Navigator initialRouteName="expiry">
            <Stack.Screen name="expiry" component={ExpiryScreen} options={{ headerShown: false }} />
            <Stack.Screen name="grocery" component={GroceryItemEditScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
