import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, ButtonText } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Divider } from '~components/ui/divider';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Text } from '~components/ui/text';

function ReceiptCard() {
    return (
        <Card className="h-fit w-full bg-background-200 p-5" size="md">
            <HStack className="flex items-center justify-between">
                <Heading className="mb-1 font-heading text-xl text-typography-800">
                    Costco
                </Heading>
                <Text className="mt-auto font-info text-2xl text-typography-950">
                    $200
                </Text>
            </HStack>

            <Divider className="my-1/2 bg-background-400" />

            <HStack className="mt-2 w-full">
                <Text className="font-body text-lg text-typography-700 xl:text-xl">
                    40 items purchased on 01/01/2023.
                </Text>
            </HStack>

            <HStack className="mt-1 flex w-full items-center justify-center">
                <Button
                    action="primary"
                    className="w-full"
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">View</ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1"
                        color="white"
                        name="eye"
                        size={24}
                    />
                </Button>
            </HStack>
        </Card>
    );
}

export default ReceiptCard;
