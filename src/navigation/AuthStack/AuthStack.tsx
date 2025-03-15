const Stack = createNativeStackNavigator();

import { LoginScreen, RegisterScreen, SplashScreen } from '~screens/index';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

export default function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="index">
            <Stack.Screen
                component={SplashScreen}
                name="index"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={RegisterScreen}
                name="registration"
                options={{ headerShown: false }}
            />
            <Stack.Screen
                component={LoginScreen}
                name="login"
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
