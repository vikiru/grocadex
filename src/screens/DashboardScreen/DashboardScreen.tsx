import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import ExpenseDisplay from '~components/ExpenseDisplay/ExpenseDisplay';
import GroceryCard from '~components/GroceryCard/GroceryCard';
import ReceiptTable from '~components/ReceiptTable/ReceiptTable';
import { useDashboard } from '~hooks/components/useDashboard';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useExpense } from '~hooks/redux/useExpense';
import { useReceipt } from '~hooks/redux/useReceipt';

//TODO: Refactor and improve default components
// TODO: Fix navigation to create new receipt
export function DefaultDashboard() {
    const navigation = useNavigation();

    return (
        <View className="mx-auto max-w-sm">
            <Text className="text-lg">You currently do not have any receipts or groceries added.</Text>
            <View className="mt-2 pb-2">
                <Text className="text-lg">
                    Consider adding a receipt with grocery items to get started on your journey!
                </Text>
            </View>
            <View>
                <Button
                    icon="cancel"
                    mode="elevated"
                    className="max-w-md my-2 w-60 bg-secondary mx-auto"
                    textColor="white"
                    onPress={() => console.log('press')}
                >
                    Add Receipt
                </Button>
            </View>
        </View>
    );
}

export default function DashboardScreen() {
    const { handleDataRetrieval } = useDashboard();
    const { monthlyTotal } = useExpense();
    const { receipts } = useReceipt();
    const { activeItems } = useActiveItem();

    useEffect(() => {
        handleDataRetrieval();
    }, []);

    return (
        <ScrollView horizontal={false} className="bg-background min-h-full min-w-full">
            <View className="bg-background">
                <ScrollView
                    className="flex flex-row space-x-2 m-2 pb-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {activeItems.slice(0, 5).map((item, index) => (
                        <GroceryCard item={item} key={index} />
                    ))}
                </ScrollView>

                {activeItems.length > 0 && <Divider />}
                {activeItems.length === 0 && receipts.length === 0 && <DefaultDashboard />}
                {monthlyTotal > 0 && <ExpenseDisplay monthlyExpense={monthlyTotal} />}

                {receipts.length > 0 && (
                    <View className="bg-background m-2 rounded-lg shadow-md border-2 border-primary">
                        <ReceiptTable receipts={receipts} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
