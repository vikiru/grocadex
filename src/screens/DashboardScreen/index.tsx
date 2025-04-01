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
import { useDashboard, useDashboardData } from '~hooks';
import { useGroceryStore, useReceiptStore } from '~store';
import { parseDate, sortActiveItems, sortReceipts } from '~utils/date';

export default function DashboardScreen() {
    const router = useRouter();
    const { retrieveData, isSuccess, data } = useDashboard();
    useEffect(() => {
        if (isSuccess && data) {
            retrieveData();
        }
    }, [isSuccess, data]);

    const { filteredGroceryItems, filteredReceipts, expenseTotal } =
        useDashboardData();

    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mb-4 mt-2 flex items-center justify-between">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Expiring Grocery Items
                </Heading>
                {filteredGroceryItems.length > 0 && (
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

            {filteredGroceryItems.length > 0 ? (
                <FlashList
                    className="mx-4 max-h-[8rem]"
                    data={filteredGroceryItems.slice(0, 5)}
                    estimatedItemSize={5}
                    horizontal
                    renderItem={({ item }) => (
                        <HStack className="mr-2">
                            <GroceryCard
                                deletable={false}
                                editable={false}
                                groceryItem={item}
                                markable={false}
                            />
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
                        ${expenseTotal.toFixed(2)}
                    </Heading>
                </Card>
            </HStack>

            <DataTable
                data={filteredReceipts}
                dataKeys={[
                    { format: 'string', key: 'store' },
                    { format: 'date', key: 'purchaseDate' },
                    { format: 'numeric', key: 'total' },
                ]}
                pageSize={2}
                dateFormat={DateFormat}
                headers={['Store', 'Date', 'Total']}
            />
        </ScrollView>
    );
}
