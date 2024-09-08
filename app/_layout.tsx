import 'react-native-reanimated';

import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from '../hooks/useColorScheme';

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
                <Stack.Screen name="index" options={{ headerShown: false, headerTitle: '' }} />
                <Stack.Screen name="registration" options={{ headerShown: false, headerTitle: 'Register' }} />
                <Stack.Screen name="login" options={{ headerShown: false, headerTitle: 'Login' }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false, headerTitle: 'Home' }} />
            </Stack>
        </ThemeProvider>
    );
}
