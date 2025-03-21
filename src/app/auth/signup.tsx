import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Link, LinkText } from '~components/ui/link';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function SignUp() {
    return (
        <VStack className="mt-2 min-h-screen w-full bg-background-100 xs:max-w-none md:mx-auto lg:max-w-xl xl:max-w-2xl">
            <HStack className="mx-4 mt-2">
                <VStack>
                    <Heading className="font-heading xs:text-3xl xl:text-4xl">
                        Sign Up
                    </Heading>
                    <Text className="font-body text-lg text-typography-600 xl:text-xl">
                        Track your groceries and save money!
                    </Text>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        First Name
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter your first name"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Last Name
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter your last name"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Username
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter username"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Email
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter email"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-4">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Password
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter password"
                                secureTextEntry
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-4">
                <VStack className="w-full gap-3">
                    <Button action="primary" variant="solid">
                        <ButtonText className="font-body xs:text-base xl:text-lg">
                            Sign Up
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-2 flex justify-center">
                <Text className="text-lg xl:text-xl">
                    Already have an account?{' '}
                </Text>{' '}
                <Link href="/auth/login">
                    <LinkText className="text-lg xl:text-xl">Login</LinkText>
                </Link>
            </HStack>
        </VStack>
    );
}

export default SignUp;
