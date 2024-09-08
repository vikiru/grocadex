import { mdiCashMultiple, mdiClockOutline, mdiLeaf } from '@mdi/js';
import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { StatusBar, Text, View } from 'react-native';

import Icon from '@mdi/react';
import { router } from 'expo-router';
import React from 'react';
import { Button } from 'react-native-paper';
import Logo from '../components/Logo/Logo';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

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
            <StyledComponent component={View} className="flex-row mx-auto my-2">
                <StyledComponent component={Text} className="text-text text-xl italic font-body">
                    A grocery expiry and expense tracker.
                </StyledComponent>
            </StyledComponent>

            <IntroDetails
                icon={mdiClockOutline}
                heading="Track & Organize Groceries"
                subtext="Manage your grocery items and never miss an expiry date again!"
            />

            <IntroDetails
                icon={mdiCashMultiple}
                heading="Save Money"
                subtext="Monitor your monthly expenses with ease and stay on top of your budgeting goals!"
            />

            <IntroDetails
                icon={mdiLeaf}
                heading="Reduce Waste"
                subtext="Never waste unused food again due to missed expiry dates. Keep your kitchen waste-free!"
            />

            <StyledComponent component={View} className="mt-2 lg:mx-auto">
                <StyledComponent
                    component={Button}
                    icon="account-plus"
                    mode="elevated"
                    className="max-w-md my-4 w-96 bg-primary mx-auto"
                    textColor="white"
                    onPress={() => moveToRegistration()}
                >
                    Sign Up
                </StyledComponent>
                <StyledComponent
                    component={Button}
                    icon="login"
                    mode="elevated"
                    className="max-w-md my-4 w-96 bg-secondary mx-auto"
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
        <StyledComponent component={View} className="ml-6 mt-2 mx-auto flex flex-row items-start">
            <StyledComponent component={View} className="flex items-center justify-center h-16 w-16 max-w-[20%]">
                <Icon path={props.icon} size={1} />
            </StyledComponent>
            <StyledComponent component={View} className="ml-4 flex flex-col max-w-[300px]">
                <StyledComponent
                    component={Text}
                    className="text-text font-semibold text-left text-xl font-merriweather"
                >
                    {props.heading}
                </StyledComponent>
                <StyledComponent component={Text} className="text-text text-left text-lg mt-1 font-body break-words">
                    {props.subtext}
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}

interface IntroDetailsProps {
    heading: string;
    subtext: string;
    icon: string;
}
