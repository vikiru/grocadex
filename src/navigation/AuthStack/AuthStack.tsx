const Stack = createNativeStackNavigator();

import { LoginScreen, RegisterScreen, SplashScreen } from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="index">
            <Stack.Screen name="index" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="registration" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="login" component={LoginScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}
