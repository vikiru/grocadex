import React, { useEffect } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Card, ExpenseDisplay, ReceiptTable } from '~components/index';
import { useActiveItem, useExpense, useReceipt } from '~hooks/redux';

import { useNavigation } from '@react-navigation/native';
import { useDashboard } from '~hooks/components/index';

//TODO: Refactor and improve default components
// TODO: Fix navigation to create new receipt
export function DefaultDashboard() {
    const navigation = useNavigation();

    return (
        <View className="mx-auto max-w-sm">
            <Text className="text-lg">
                You currently do not have any receipts or groceries added.
            </Text>
            <View className="mt-2 pb-2">
                <Text className="text-lg">
                    Consider adding a receipt with grocery items to get started
                    on your journey!
                </Text>
            </View>
            <View>
                <Button
                    buttonColor="orange"
                    className="mx-auto my-2 w-60 max-w-md bg-secondary"
                    icon="plus"
                    mode="elevated"
                    onPress={() =>
                        navigation.navigate('receipt', {
                            screen: 'receipts/create',
                        })
                    }
                    textColor="white"
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
        <ScrollView
            className="min-h-full min-w-full bg-background"
            horizontal={false}
        >
            <View className="bg-background">
                <ScrollView
                    className="m-2 flex flex-row space-x-2 pb-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {activeItems.slice(0, 5).map((item, index) => (
                        <Card variant="detail" item={item} key={index} />
                    ))}
                </ScrollView>

                {activeItems.length > 0 && <Divider />}
                {activeItems.length === 0 && receipts.length === 0 && (
                    <DefaultDashboard />
                )}
                {monthlyTotal > 0 && (
                    <ExpenseDisplay monthlyExpense={monthlyTotal} />
                )}

                {receipts.length > 0 && (
                    <View className="m-2 rounded-lg bg-background shadow-md">
                        <ReceiptTable receipts={receipts} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}
