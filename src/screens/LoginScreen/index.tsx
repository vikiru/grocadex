import { useRouter } from 'expo-router';
import { LoginForm } from '~components';
import { Heading, HStack, Link, LinkText, Text, VStack } from '~components/ui';
import { FRONTEND_REGISTRATION_ROUTE } from '~constants/Routes';

export default function LoginScreen() {
    const router = useRouter();
    return (
        <VStack className="min-h-screen w-full bg-background-100 xs:max-w-none md:mx-auto lg:mt-20 lg:max-w-xl xl:mt-40 xl:max-w-2xl">
            <HStack className="mx-4 mt-2">
                <VStack>
                    <Heading className="font-heading xs:text-3xl xl:text-4xl">
                        Login
                    </Heading>
                    <Text className="font-body text-lg text-typography-600 xl:text-xl">
                        Ready to continue saving money and reducing waste
                        together?
                    </Text>
                </VStack>
            </HStack>

            <LoginForm />

            <HStack className="mx-4 mt-2 flex justify-center">
                <Text className="text-lg xl:text-xl">
                    Don&apos;t have an account?{' '}
                </Text>
                <Link
                    onPress={() => {
                        router.replace(FRONTEND_REGISTRATION_ROUTE);
                    }}
                >
                    <LinkText className="text-lg xl:text-xl">Sign Up</LinkText>
                </Link>
            </HStack>
        </VStack>
    );
}
