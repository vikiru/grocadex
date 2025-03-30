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
import { GroceryItem, Receipt } from '~types';
import { formatDate, parseDate } from '~utils/date';

export default function DashboardScreen() {
    const router = useRouter();
    const { retrieveData, isSuccess, data } = useDashboard();
    const receipts = useReceiptStore((state) => state.receipts);
    const groceryItems = useGroceryStore((state) => state.groceryItems);

    useEffect(() => {
        if (isSuccess && data) {
            retrieveData();
        }
    }, []);

    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mb-4 mt-2 flex items-center justify-between">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Current Grocery Items
                </Heading>
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
            </HStack>

            <ScrollView className="mx-4 max-h-[200px]" horizontal>
                <HStack className="gap-4">
                    {groceryItems
                        .slice(0, 5)
                        .map((groceryItem: GroceryItem, index) => (
                            <GroceryCard
                                groceryItem={groceryItem}
                                key={index}
                            />
                        ))}
                </HStack>
            </ScrollView>

            <HStack className="mx-4 mt-4">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Monthly Expenses
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-4">
                <Card className="w-full max-w-lg rounded-xl bg-background-200/50 p-6 shadow-sm">
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
                    <Text className="font-body text-xl text-error-500">
                        40% increase from last month
                    </Text>
                </Card>
            </HStack>

            <DataTable
                data={receipts}
                dataKeys={[
                    { format: 'date', key: 'purchaseDate' },

                    { format: 'string', key: 'store' },
                    { format: 'numeric', key: 'total' },
                ]}
                dateFormat={DateFormat}
                headers={['Date', 'Store', 'Total']}
            />
        </ScrollView>
    );
}
