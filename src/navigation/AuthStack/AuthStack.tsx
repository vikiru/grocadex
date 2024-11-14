const Stack = createNativeStackNavigator();

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '~screens/LoginScreen/LoginScreen';
import RegisterScreen from '~screens/RegisterScreen/RegisterScreen';
import SplashScreen from '~screens/SplashScreen/SplashScreen';

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="index">
            <Stack.Screen name="index" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="registration" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
