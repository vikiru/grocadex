import 'react-native-reanimated';

import '../../global.css';

import {
    DarkTheme,
    DefaultTheme,
    ThemeProvider,
} from '@react-navigation/native';
import { defaultConfig } from '@tamagui/config';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createTamagui, TamaguiProvider } from 'tamagui';
import { useColorScheme } from '~hooks/components/useColorScheme';
import { MainNavigation } from '~navigation/index';
import { persistor, store } from '~store/store';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const config = createTamagui(defaultConfig);

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('~assets/fonts/SpaceMono-Regular.ttf'),
        Baloo2: require('~assets/fonts/Baloo2-VariableFont_wght.ttf'),
        'DM Mono': require('~assets/fonts/DMMono-Regular.ttf'),
        'DM Sans': require('~assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
        Lato: require('~assets/fonts/Lato-Regular.ttf'),
        'Open Sans': require('~assets/fonts/OpenSans-VariableFont_wdth,wght.ttf'),
        Nunito: require('~assets/fonts/Nunito-VariableFont_wght.ttf'),
        Lora: require('~assets/fonts/Lora-VariableFont_wght.ttf'),
        Merriweather: require('~assets/fonts/Merriweather-Regular.ttf'),
        Montserrat: require('~assets/fonts/Montserrat-VariableFont_wght.ttf'),
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
        <ThemeProvider
            value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
            <PaperProvider>
                <TamaguiProvider config={config}>
                    <Provider store={store}>
                        <PersistGate loading={null} persistor={persistor}>
                            <MainNavigation />
                            <Toast />
                        </PersistGate>
                    </Provider>
                </TamaguiProvider>
            </PaperProvider>
        </ThemeProvider>
    );
}
