import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { StatusBar, Text, View } from 'react-native';

import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import IntroDetails from '~components/IntroDetails/IntroDetails';
import Logo from '~components/Logo/Logo';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

export default function SplashScreen() {
    const moveToRegistration = async () => {
        router.push('/registration');
    };

    const moveToLogin = async () => {
        router.push('/login');
    };

    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex mt-10">
            <StatusBar />
            <Logo />
            <StyledComponent component={View} className="flex-row mx-auto mt-1 mb-3">
                <StyledComponent component={Text} className="text-text text-lg italic font-body">
                    A grocery expiry and expense tracker.
                </StyledComponent>
            </StyledComponent>

            <IntroDetails
                icon="clock-outline"
                heading="Track & Organize Groceries"
                subtext="Manage your grocery items and never miss an expiry date again!"
            />

            <IntroDetails
                icon="cash-multiple"
                heading="Save Money"
                subtext="Monitor your monthly expenses with ease and stay on top of your budgeting goals!"
            />

            <IntroDetails
                icon="leaf"
                heading="Reduce Waste"
                subtext="Never waste unused food again due to missed expiry dates. Keep your kitchen waste-free!"
            />

            <StyledComponent component={View} className="mt-5 lg:mx-auto">
                <StyledComponent
                    component={Button}
                    icon="account-plus"
                    mode="elevated"
                    className="max-w-md my-2 w-60 bg-primary mx-auto"
                    textColor="white"
                    onPress={() => moveToRegistration()}
                >
                    Sign Up
                </StyledComponent>
                <StyledComponent
                    component={Button}
                    icon="login"
                    mode="elevated"
                    className="max-w-md my-2 w-60 bg-secondary mx-auto"
                    textColor="white"
                    onPress={() => moveToLogin()}
                >
                    Login
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
