import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Link, LinkText } from '~components/ui/link';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function Login() {
    return (
        <VStack className="min-h-screen w-full bg-background-100 xs:max-w-none md:mx-auto lg:mt-20 lg:max-w-xl xl:mt-40 xl:max-w-2xl">
            <HStack className="mx-4 mt-2">
                <VStack>
                    <Heading className="font-heading xs:text-3xl xl:text-4xl">
                        Login
                    </Heading>
                    <Text className="font-body text-lg text-typography-600 xl:text-xl">
                        Let&apos;s continue saving money!
                    </Text>
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
                            Login
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-2 flex justify-center">
                <Text>Don&apos;t have an account? </Text>{' '}
                <Link href="/auth/signup">
                    <LinkText>Sign Up</LinkText>
                </Link>
            </HStack>
        </VStack>
    );
}

export default Login;
