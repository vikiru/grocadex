import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import { DataTable, GroceryCard } from '~components';
import {
    Button,
    ButtonText,
    Card,
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
import { useDashboard } from '~hooks';
import { useGroceryStore, useReceiptStore } from '~store';
import { parseDate, sortActiveItems, sortReceipts } from '~utils/date';

export default function DashboardScreen() {
    const router = useRouter();
    const { retrieveData, isSuccess, data } = useDashboard();
    const receipts = useReceiptStore((state) => state.receipts);
    const groceryItems = useGroceryStore((state) => state.groceryItems);
    sortActiveItems(groceryItems);
    sortReceipts(receipts);

    useEffect(() => {
        if (isSuccess && data) {
            retrieveData();
        }
    }, [isSuccess, data]);

    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mb-4 mt-2 flex items-center justify-between">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Expiring Grocery Items
                </Heading>
                {groceryItems.length > 0 && (
                    <Button
                        onPress={() => {
                            router.push('/grocery');
                        }}
                        variant="link"
                    >
                        <ButtonText className="text-lg xl:text-xl">
                            Show All
                        </ButtonText>
                    </Button>
                )}
            </HStack>

            {groceryItems.length > 0 ? (
                <FlashList
                    className="mx-4 grid max-h-[200px]"
                    data={groceryItems.slice(0, 5)}
                    estimatedItemSize={groceryItems.length > 0 ? 5 : 0}
                    horizontal
                    renderItem={({ item }) => (
                        <HStack className="mr-2">
                            <GroceryCard groceryItem={item} />
                        </HStack>
                    )}
                />
            ) : (
                <Text className="mx-4 font-body text-lg text-typography-700 xl:text-xl">
                    You do not have any grocery items. Try creating a receipt to
                    add items!
                </Text>
            )}

            <HStack className="mx-4 mt-4">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Monthly Expenses
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-4">
                <Card className="w-full max-w-lg rounded-lg bg-background-200/50 px-6 shadow-sm">
                    <Text className="mb-2 font-heading text-xl text-typography-600">
                        Your Expenses
                    </Text>
                    <Heading className="text-primary mb-2 font-info font-bold text-typography-950 xs:text-3xl xl:text-4xl">
                        $
                        {receipts
                            .filter((receipt) => {
                                const purchaseDate = parseDate(
                                    receipt.purchaseDate,
                                );
                                const currentDate = new Date();
                                return (
                                    purchaseDate.getMonth() ===
                                        currentDate.getMonth() &&
                                    purchaseDate.getFullYear() ===
                                        currentDate.getFullYear()
                                );
                            })
                            .reduce(
                                (total, receipt) =>
                                    total + Number(receipt.total),
                                0,
                            )
                            .toFixed(2)}
                    </Heading>
                </Card>
            </HStack>

            <DataTable
                data={receipts}
                dataKeys={[
                    { format: 'string', key: 'store' },
                    { format: 'date', key: 'purchaseDate' },
                    { format: 'numeric', key: 'total' },
                ]}
                dateFormat={DateFormat}
                headers={['Store', 'Date', 'Total']}
            />
        </ScrollView>
    );
}
