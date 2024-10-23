import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { StatusBar, Text, View } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import Logo from '~components/Logo/Logo';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

type IntroDetailsProps = {
    heading: string;
    subtext: string;
    icon: any;
};

export default function Index() {
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

export function IntroDetails(props: IntroDetailsProps) {
    return (
        <StyledComponent component={View} className="flex flex-row items-center my-2">
            <StyledComponent component={View} className="flex items-center justify-center h-16 w-16 max-w-[20%]">
                <StyledComponent
                    component={MaterialCommunityIcons}
                    name={props.icon}
                    size={40}
                    color="black"
                    className="ml-3"
                />
            </StyledComponent>
            <StyledComponent component={View} className="ml-4 flex flex-col max-w-[300px]">
                <StyledComponent
                    component={Text}
                    className="text-text font-semibold text-left text-lg font-merriweather"
                >
                    {props.heading}
                </StyledComponent>
                <StyledComponent component={View} className="mr-5 flex">
                    <StyledComponent component={Text} className="text-text text-left text-md mt-1 font-body mr-2">
                        {props.subtext}
                    </StyledComponent>
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
