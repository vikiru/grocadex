import 'react-native-reanimated';
import '@/global.css';
import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';

import '../../global.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { GluestackUIProvider } from '~components/ui/gluestack-ui-provider';
import { useColorScheme } from '~hooks/components/useColorScheme';
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        Hind: require('~assets/fonts/Hind-Regular.ttf'),
        Poppins: require('~assets/fonts/Poppins-Regular.ttf'),
        Sansita: require('~assets/fonts/Sansita-Regular.ttf'),
        'IBM Plex Sans': require('~assets/fonts/IBMPlexSans-VariableFont_wdth,wght.ttf'),
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
        <QueryClientProvider client={queryClient}>
            <GluestackUIProvider mode="light">
                <ThemeProvider
                    value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
                >
                    <Stack>
                        <Stack.Screen name="grocery/create" />
                    </Stack>
                </ThemeProvider>
            </GluestackUIProvider>
        </QueryClientProvider>
    );
}
