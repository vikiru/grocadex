import { useRouter } from 'expo-router';
import React from 'react';
import { IntroDetails } from '~components/index';
import {
    Button,
    ButtonText,
    Heading,
    HStack,
    Link,
    LinkText,
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
        <VStack className="min-h-screen w-full bg-background-100 xs:mt-2 xs:max-w-none md:mx-auto lg:mt-12 lg:max-w-xl xl:max-w-2xl">
            <VStack className="flex w-full flex-row justify-center">
                <Heading className="w-fit text-center font-logo text-4xl font-bold text-typography-950 xl:text-5xl">
                    GroceryTracker
                </Heading>
            </VStack>
            <Text className="text-center font-body text-lg italic text-typography-600 xl:text-2xl">
                A grocery expiry and expense tracker.
            </Text>

            <Link className="mx-4" href="/receipt/create">
                <LinkText>Test</LinkText>
            </Link>

            <VStack>
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
            </VStack>

            <HStack className="mx-4 mt-4">
                <VStack className="w-full gap-3">
                    <Button
                        action="primary"
                        onPress={() => router.push(FRONTEND_LOGIN_ROUTE)}
                        variant="solid"
                    >
                        <ButtonText className="font-body xs:text-base xl:text-lg">
                            Login
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-2">
                <VStack className="w-full gap-3">
                    <Button
                        action="secondary"
                        onPress={() => router.push(FRONTEND_REGISTRATION_ROUTE)}
                        variant="solid"
                    >
                        <ButtonText className="font-body xs:text-base xl:text-lg">
                            Sign Up
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>
        </VStack>
    );
}

export default SplashScreen;
