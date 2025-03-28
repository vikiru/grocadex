import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Button, ButtonText } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Divider } from '~components/ui/divider';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Text } from '~components/ui/text';
import { DateFormat } from '~constants/Dates';
import { FRONTEND_RECEIPT_ROUTE } from '~constants/Routes';
import { Receipt } from '~types/Receipt';
import { formatDate, parseDate } from '~utils/date';

type ReceiptCardProps = {
    receipt: Receipt;
};

function ReceiptCard({ receipt }: ReceiptCardProps) {
    const router = useRouter();

    return (
        <Card className="h-fit w-full bg-background-200 p-5" size="md">
            <HStack className="flex items-center justify-between">
                <Heading className="mb-1 font-heading text-xl text-typography-800">
                    {receipt.store}
                </Heading>
                <Text className="mt-auto font-info text-2xl text-typography-950">
                    ${Number(receipt.total).toFixed(2)}
                </Text>
            </HStack>

            <Divider className="my-1/2 bg-background-400" />

            <HStack className="mt-2 w-full">
                <Text className="font-body text-lg text-typography-700 xl:text-xl">
                    {receipt.groceryItems.length} items purchased on{' '}
                    {formatDate(parseDate(receipt.purchaseDate), DateFormat)}.
                </Text>
            </HStack>

            <HStack className="mt-1 flex w-full items-center justify-center">
                <Button
                    action="primary"
                    className="w-full"
                    onPress={() =>
                        router.push(`${FRONTEND_RECEIPT_ROUTE}/${receipt.id}`)
                    }
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
