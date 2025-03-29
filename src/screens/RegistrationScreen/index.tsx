import { useRouter } from 'expo-router';
import { RegistrationForm } from '~components/index';
import { Heading, HStack, Link, LinkText, Text, VStack } from '~components/ui';
import { FRONTEND_LOGIN_ROUTE } from '~constants/Routes';

export default function RegistrationScreen() {
    const router = useRouter();

    return (
        <VStack className="mt-2 min-h-screen w-full bg-background-100 xs:max-w-none md:mx-auto lg:max-w-xl xl:max-w-2xl">
            <HStack className="mx-4 mt-2">
                <VStack>
                    <Heading className="font-heading xs:text-3xl xl:text-4xl">
                        Sign Up
                    </Heading>
                    <Text className="font-body text-lg text-typography-600 xl:text-xl">
                        Start your journey to saving money and reducing food
                        waste!
                    </Text>
                </VStack>
            </HStack>

            <RegistrationForm />

            <HStack className="mx-4 mt-2 flex justify-center">
                <Text className="text-lg xl:text-xl">
                    Already have an account?{' '}
                </Text>{' '}
                <Link
                    onPress={() => {
                        router.replace(FRONTEND_LOGIN_ROUTE);
                    }}
                >
                    <LinkText className="text-lg xl:text-xl">Login</LinkText>
                </Link>
            </HStack>
        </VStack>
    );
}
