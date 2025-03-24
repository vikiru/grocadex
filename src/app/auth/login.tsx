import LoginForm from '~components/forms/LoginForm';
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

            <LoginForm />

            <HStack className="mx-4 mt-2 flex justify-center">
                <Text className="text-lg xl:text-xl">
                    Don&apos;t have an account?{' '}
                </Text>{' '}
                <Link href="/auth/signup">
                    <LinkText className="text-lg xl:text-xl">Sign Up</LinkText>
                </Link>
            </HStack>
        </VStack>
    );
}

export default Login;
