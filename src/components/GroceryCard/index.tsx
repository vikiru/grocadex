import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, ButtonText } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Divider } from '~components/ui/divider';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function GroceryCard() {
    return (
        <Card className="h-fit w-full bg-background-200 p-5" size="md">
            <HStack className="flex items-center justify-between">
                <Heading className="mb-1 font-heading text-xl text-typography-800">
                    Apple
                </Heading>
                <Text className="mt-auto font-info text-2xl text-typography-950">
                    $200
                </Text>
            </HStack>

            <Divider className="my-1/2 bg-background-400" />

            <HStack className="mt-2 flex w-full justify-between">
                <VStack>
                    <Text className="font-heading text-typography-800">
                        Quantity
                    </Text>
                    <Text className="text-center font-info text-typography-700">
                        3
                    </Text>
                </VStack>
                <VStack>
                    <Text className="font-heading text-typography-800">
                        Purchased
                    </Text>
                    <Text className="text-center font-info text-typography-700">
                        01/01/2023
                    </Text>
                </VStack>
                <VStack>
                    <Text className="font-heading text-typography-800">
                        Expiry
                    </Text>
                    <Text className="text-center font-info text-typography-700">
                        5 days
                    </Text>
                </VStack>
            </HStack>

            <HStack className="mt-2 justify-between gap-4">
                <Button
                    action="primary"
                    className="flex-1"
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">Edit</ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1 ml-2"
                        color="white"
                        name="pencil"
                        size={24}
                    />
                </Button>
                <Button
                    action="negative"
                    className="flex-1"
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">
                        Delete
                    </ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1 ml-2"
                        color="white"
                        name="trash-can"
                        size={24}
                    />
                </Button>
            </HStack>
        </Card>
    );
}

export default GroceryCard;
