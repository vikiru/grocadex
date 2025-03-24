import RegistrationForm from '~components/forms/RegistrationForm';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
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

            <RegistrationForm />

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
