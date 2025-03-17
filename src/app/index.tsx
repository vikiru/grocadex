import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native';
import IntroDetails from '~components/IntroDetails';
import { Button, ButtonText } from '~components/ui/button';

function IndexScreen() {
    return (
        <View className="min-h-screen bg-light-background-50 pt-4 lg:pt-20 dark:bg-dark-background-50">
            <View className="flex w-full flex-row justify-center">
                <Text className="w-fit text-center text-h1 font-bold">
                    <Text className="text-light-primary-400 dark:text-dark-primary-400">
                        Grocery
                    </Text>
                    <Text className="text-light-accent-400 dark:text-dark-accent-400">
                        Tracker
                    </Text>
                </Text>
            </View>

            <Text className="font-heading text-center text-h5 italic text-light-text-950 dark:text-dark-text-950">
                A smart way to manage your groceries.
            </Text>

            <View className="lg:my-4">
                <IntroDetails
                    heading="Track & Organize Groceries"
                    icon="clock-outline"
                    subtext="Manage your grocery items and never miss an expiry date again!"
                />

                <IntroDetails
                    heading="Save Money"
                    icon="cash-multiple"
                    subtext="Monitor your monthly expenses with ease and stay on top of your budgeting goals!"
                />

                <IntroDetails
                    heading="Reduce Waste"
                    icon="leaf"
                    subtext="Never waste unused food again due to missed expiry dates. Keep your kitchen waste-free!"
                />
            </View>

            <View className="xs:mx-auto mx-6 mt-5 flex flex-col items-center justify-center gap-2 lg:mx-auto lg:w-full lg:gap-4">
                <Button
                    action="primary"
                    className="bg-light-primary-400 lg:w-full lg:max-w-[450px] dark:bg-dark-primary-400"
                    variant="solid"
                >
                    <ButtonText>Login</ButtonText>
                </Button>

                <Button
                    action="secondary"
                    className="bg-light-accent-400 lg:w-full lg:max-w-[450px] dark:bg-dark-accent-400"
                    variant="solid"
                >
                    <ButtonText>Sign Up</ButtonText>
                </Button>
            </View>
        </View>
    );
}

export default IndexScreen;
