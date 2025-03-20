import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native';
import IntroDetails from '~components/IntroDetails';
import { Button, ButtonText } from '~components/ui/button';

function IndexScreen() {
    return (
        <View className="bg-light-background-50 flex min-h-screen items-center justify-center">
            <View className="flex w-full flex-row justify-center lg:-mt-12">
                <Text className="w-fit text-center font-bold">
                    <Text className="h1 text-light-primary-400">Grocery</Text>
                    <Text className="h1 text-light-accent-400">Tracker</Text>
                </Text>
            </View>

            <Text className="h4 text-light-text-950 text-center italic lg:pt-2">
                A smart way to manage your groceries.
            </Text>

            <View className="lg:mt-4">
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

            <View className="mx-6 mt-5 flex flex-col items-center justify-center gap-2 lg:mx-auto lg:w-full lg:gap-4">
                <TouchableOpacity className="h6 4xl:h5 bg-light-primary-400 w-full rounded-md px-3 py-2 text-center xs:max-w-[400px] lg:max-w-[450px] xl:max-w-[650px] 4xl:max-w-[850px]">
                    Login
                </TouchableOpacity>

                <TouchableOpacity className="h6 4xl:h5 bg-light-accent-400 w-full rounded-md px-3 py-2 text-center xs:max-w-[400px] lg:max-w-[450px] xl:max-w-[650px] 4xl:max-w-[850px]">
                    Sign Up
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default IndexScreen;
