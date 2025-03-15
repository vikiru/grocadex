import { StatusBar, Text, View } from 'react-native';
import { IntroDetails, Logo } from '~components/index';

import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';

export default function SplashScreen() {
    const moveToRegistration = async () => {
        router.push('/registration');
    };

    const moveToLogin = async () => {
        router.push('/login');
    };

    return (
        <View className="mt-10 flex min-h-full min-w-full bg-background">
            <StatusBar />
            <Logo />
            <View className="mx-auto mb-3 mt-1 flex-row">
                <Text className="font-body text-lg italic text-text">
                    A grocery expiry and expense tracker.
                </Text>
            </View>

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

            <View className="mt-5 lg:mx-auto">
                <Button
                    buttonColor="#4CAF50"
                    className="mx-auto my-2 w-60 max-w-md"
                    icon="account-plus"
                    mode="elevated"
                    onPress={() => moveToRegistration()}
                    textColor="white"
                >
                    Sign Up
                </Button>
                <Button
                    buttonColor="#FF9800"
                    className="mx-auto my-2 w-60 max-w-md"
                    icon="login"
                    mode="elevated"
                    onPress={() => moveToLogin()}
                    textColor="white"
                >
                    Login
                </Button>
            </View>
        </View>
    );
}
