import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Alert, DataTable } from '~components';
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
import { GroceryItem, Receipt } from '~types';
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

            <DataTable
                data={receipt.groceryItems as GroceryItem[]}
                dataKeys={[
                    { format: 'string', key: 'name' },
                    { format: 'string', key: 'quantity' },
                    { format: 'numeric', key: 'totalPrice' },
                ]}
                dateFormat={DateFormat}
                headers={['Name', 'Quantity', 'Total']}
                pageSize={5}
            />

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

            <HStack className="mx-4 mb-2 mt-2">
                <Alert
                    alertHeading="Are you sure you want to delete this receipt?"
                    alertText="Deleting the receipt will remove it and all grocery items, this action cannot be undone. Please confirm if you wish to proceed."
                    buttonAction="negative"
                    buttonText="Delete"
                    iconName="trash-can"
                    handleDelete={async () => {
                        await handleDelete(receipt.id!);
                        router.replace(FRONTEND_RECEIPT_ROUTE);
                    }}
                />
            </HStack>
        </VStack>
    );
}
