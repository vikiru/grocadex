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
        <View className="bg-background min-h-full min-w-full flex mt-10">
            <StatusBar />
            <Logo />
            <View className="flex-row mx-auto mt-1 mb-3">
                <Text className="text-text text-lg italic font-body">A grocery expiry and expense tracker.</Text>
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
                    icon="account-plus"
                    mode="elevated"
                    className="max-w-md my-2 w-60 mx-auto"
                    buttonColor="#4CAF50"
                    textColor="white"
                    onPress={() => moveToRegistration()}
                >
                    Sign Up
                </Button>
                <Button
                    icon="login"
                    mode="elevated"
                    className="max-w-md my-2 w-60 mx-auto"
                    buttonColor="#FF9800"
                    textColor="white"
                    onPress={() => moveToLogin()}
                >
                    Login
                </Button>
            </View>
        </View>
    );
}
