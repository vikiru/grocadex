import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { useColorScheme } from '@/app/hooks/useColorScheme';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack>
                <Stack.Screen name="index" />
                <Stack.Screen name="registration" />
                <Stack.Screen name="login" />
                <Stack.Screen name="dashboard" />
            </Stack>
        </ThemeProvider>
    );
}
