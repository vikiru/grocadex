import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { Alert } from '~components';
import {
    Button,
    ButtonText,
    Heading,
    HStack,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    Text,
    VStack,
} from '~components/ui';
import { DateFormat } from '~constants/Dates';
import {
    FRONTEND_RECEIPT_MODIFY_ROUTE,
    FRONTEND_RECEIPT_ROUTE,
} from '~constants/Routes';
import { useDeleteReceipt } from '~hooks';
import { useReceiptStore } from '~store';
import { Receipt } from '~types';
import { formatDate, parseDate } from '~utils/date';

export default function ReceiptDetailsScreen() {
    const { id } = useLocalSearchParams();
    const receipts = useReceiptStore((state) => state.receipts);
    const receipt = receipts.find(
        (receipt: Receipt) => receipt.id === Number(id),
    );
    const router = useRouter();
    const { handleDelete } = useDeleteReceipt();

    if (!receipt) {
        return (
            <HStack className="mx-4 mt-2">
                <Text className="font-body text-lg text-typography-600">
                    Receipt not found.
                </Text>
            </HStack>
        );
    }
    return (
        <VStack className="bg-background-100">
            <HStack className="mx-4 mt-2 flex items-center justify-between">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    {receipt.store}
                </Heading>
                <Heading className="font-info font-medium xs:text-2xl xl:text-3xl">
                    ${Number(receipt.total).toFixed(2)}
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-1">
                <Text className="font-body text-lg text-typography-600 xl:text-xl">
                    {receipt.groceryItems.length} items purchased on{' '}
                    {formatDate(parseDate(receipt.purchaseDate), DateFormat)}.
                </Text>
            </HStack>

            <ScrollView className="mx-4 mb-6 mt-4 max-h-[20rem] bg-background-100 shadow-sm xl:mt-2 xl:max-h-[28rem]">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-background-200/50">
                            <TableHead className="font-heading text-xl">
                                Item
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Quantity
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Total
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {receipt.groceryItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableData className="font-body xl:text-lg">
                                    {item.name}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    {item.quantity}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    ${Number(item.totalPrice).toFixed(2)}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollView>

            <HStack className="mx-4 mt-2">
                <Button
                    action="primary"
                    className="flex-1"
                    onPress={() =>
                        router.push(
                            `${FRONTEND_RECEIPT_MODIFY_ROUTE}/${receipt.id}`,
                        )
                    }
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
            </HStack>

            <HStack className="mx-4 mt-2">
                <Alert
                    alertHeading="Are you sure you want to delete this receipt?"
                    alertText="Deleting the receipt will remove it and all grocery items, this action cannot be undone. Please confirm if you wish to proceed."
                    handleDelete={async () => {
                        await handleDelete(receipt.id!);
                        router.replace(FRONTEND_RECEIPT_ROUTE);
                    }}
                />
            </HStack>
        </VStack>
    );
}
