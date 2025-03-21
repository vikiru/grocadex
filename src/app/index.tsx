import React from 'react';
import IntroDetails from '~components/IntroDetails';
import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function IndexScreen() {
    return (
        <VStack className="min-h-screen w-full bg-background-100 xs:mt-2 xs:max-w-none md:mx-auto lg:mt-4 lg:max-w-xl xl:max-w-2xl">
            <VStack className="flex w-full flex-row justify-center">
                <Heading className="w-fit text-center font-logo text-4xl font-bold text-typography-950 xl:text-5xl">
                    GroceryTracker
                </Heading>
            </VStack>
            <Text className="text-center font-body text-lg italic text-typography-600 xl:text-2xl">
                A smart way to manage your groceries
            </Text>

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
                    <Button action="primary" variant="solid">
                        <ButtonText className="font-body xs:text-base xl:text-lg">
                            Login
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-2">
                <VStack className="w-full gap-3">
                    <Button action="secondary" variant="solid">
                        <ButtonText className="font-body xs:text-base xl:text-lg">
                            Sign Up
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>
        </VStack>
    );
}

export default IndexScreen;
