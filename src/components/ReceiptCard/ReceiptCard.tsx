import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { router } from 'expo-router';
import React from 'react';
import { DateStringFormat } from '~constants/Dates';
import { Receipt } from '~types/Receipt';
import { formatDate } from '~utils/date';

export default function ReceiptCard({ receipt }: { receipt: Receipt | Partial<Receipt> }) {
    return (
        <Card className="m-2 rounded-lg bg-white border-primary border-2 shadow-md">
            <Card.Content className="">
                <View className="flex flex-row justify-between mb-1">
                    <Text className="text-xl font-heading flex-1">{receipt.store}</Text>
                    <Text className="font-heading font-light text-lg">
                        {formatDate(receipt.purchaseDate!, DateStringFormat)}
                    </Text>
                </View>

                <Text className="text-lg font-semibold mb-1">CAD${Number(receipt.total!).toFixed(2)}</Text>
                <View className="flex mt-1">
                    <Button
                        className="shadow-sm"
                        icon="eye"
                        mode="outlined"
                        onPress={() => {
                            router.push(`/receipt/${receipt.id}`);
                        }}
                    >
                        View Receipt
                    </Button>
                </View>
            </Card.Content>
        </Card>
    );
}
