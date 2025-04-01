import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
    Button,
    ButtonText,
    Divider,
    Heading,
    HStack,
    Text,
    VStack,
} from '~components/ui';
import { APP_VERSION } from '~constants/Version';

export default function SettingsScreen() {
    const user = useUserStore((state) => state.user);
    const { handleLogout } = useLogout();
    return (
        <VStack className="min-h-screen bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-2xl xl:text-3xl">
                    Settings
                </Heading>
            </HStack>

            <VStack className="mb-2">
                <HStack className="mx-4 mt-2 flex items-center gap-2">
                    <MaterialCommunityIcons name="account" size={24} />
                    <Heading className="font-heading font-medium xs:text-xl xl:text-2xl">
                        Account Information
                    </Heading>
                </HStack>
                <VStack className="mx-4 mt-2 rounded-lg bg-background-200 p-6">
                    <HStack className="mb-2 flex items-center justify-between">
                        <Text className="font-heading text-lg font-medium text-typography-950">
                            Full Name
                        </Text>
                        <Text className="font-info text-lg text-typography-600">
                            {user?.firstName} {user?.lastName}
                        </Text>
                    </HStack>
                    <Divider className="my-2 bg-background-300" />
                    <HStack className="mt-2 flex items-center justify-between">
                        <Text className="font-heading text-lg text-typography-950">
                            Username
                        </Text>
                        <Text className="font-info text-lg text-typography-600">
                            {user?.username}
                        </Text>
                    </HStack>
                    <Divider className="my-2 bg-background-300" />
                    <HStack className="mt-2 flex items-center justify-between">
                        <Text className="font-heading text-lg text-typography-950">
                            Email
                        </Text>
                        <Text className="font-info text-lg text-typography-600">
                            {user?.email}
                        </Text>
                    </HStack>
                </VStack>
            </VStack>

            <HStack className="mx-4 mt-2 flex items-center gap-2">
                <MaterialCommunityIcons name="information" size={24} />
                <Heading className="font-heading font-medium xs:text-xl xl:text-2xl">
                    App Information
                </Heading>
            </HStack>
            <VStack className="mx-4 mt-2 rounded-lg bg-background-200 px-6 py-4">
                <HStack className="mb-2 flex items-center justify-between">
                    <Text className="font-heading text-lg font-medium text-typography-950">
                        App Version
                    </Text>
                    <Text className="font-info text-lg text-typography-600">
                        {APP_VERSION}
                    </Text>
                </HStack>
            </VStack>

            <HStack className="fixed bottom-0 left-0 right-0 mx-4 mb-4">
                <Button
                    action="negative"
                    className="w-full"
                    onPress={handleLogout}
                    variant="solid"
                >
                    <MaterialCommunityIcons
                        color={'white'}
                        name="logout"
                        size={24}
                    />
                    <ButtonText>Logout</ButtonText>
                </Button>
            </HStack>
        </VStack>
    );
}
