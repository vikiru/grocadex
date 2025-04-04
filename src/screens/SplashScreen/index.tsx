import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { IntroDetails } from '~components';
import {
    Button,
    ButtonText,
    Heading,
    HStack,
    Text,
    VStack,
} from '~components/ui';
import {
    FRONTEND_LOGIN_ROUTE,
    FRONTEND_REGISTRATION_ROUTE,
} from '~constants/Routes';

function SplashScreen() {
    const router = useRouter();
    return (
        <VStack className="w-full bg-background-100 xs:mt-10 xs:max-w-none md:mx-auto lg:mt-12 lg:max-w-xl xl:max-w-2xl">
            <VStack className="flex w-full flex-row justify-center">
                <Heading className="w-fit text-center font-logo text-4xl font-bold text-typography-950 xl:text-5xl">
                    Grocadex
                </Heading>
            </VStack>
            <HStack className="mb-4 mt-2 flex justify-center">
                <Text className="text-center font-body text-lg italic text-typography-600 xl:text-2xl">
                    A grocery expiry and expense tracker.
                </Text>
            </HStack>
            <VStack className="mt-4">
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
                    subtext="Prevent food waste by tracking expiry dates and keeping your kitchen waste-free!"
                />
            </VStack>

            <VStack className="fixed bottom-0 left-0 right-0 mb-8">
                <HStack className="mt-4 xs:mx-4 md:max-w-[450px] lg:mx-auto lg:w-1/2 xl:max-w-[650px] 4xl:max-w-[800px]">
                    <VStack className="w-full gap-3">
                        <Button
                            action="primary"
                            onPress={() => router.push(FRONTEND_LOGIN_ROUTE)}
                            variant="solid"
                        >
                            <MaterialCommunityIcons
                                color="white"
                                name="login"
                                size={24}
                            />
                            <ButtonText className="font-body xs:text-base xl:text-lg">
                                Login
                            </ButtonText>
                        </Button>
                    </VStack>
                </HStack>

                <HStack className="mt-2 xs:mx-4 md:max-w-[450px] lg:mx-auto lg:w-1/2 xl:max-w-[650px] 4xl:max-w-[800px]">
                    <VStack className="w-full gap-3">
                        <Button
                            action="secondary"
                            onPress={() =>
                                router.push(FRONTEND_REGISTRATION_ROUTE)
                            }
                            variant="solid"
                        >
                            <MaterialCommunityIcons
                                name="account-plus"
                                size={24}
                            />
                            <ButtonText className="font-body xs:text-base xl:text-lg">
                                Sign Up
                            </ButtonText>
                        </Button>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}

export default SplashScreen;
