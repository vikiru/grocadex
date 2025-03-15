import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { DateStringFormat } from '~constants/Dates';
import { Receipt } from '~types/index';
import { formatDate } from '~utils/date';

export default function ReceiptCard({
    receipt,
}: {
    receipt: Partial<Receipt> | Receipt;
}) {
    const navigation = useNavigation();

    return (
        <Card className="m-2 rounded-lg border-2 border-primary bg-white shadow-md">
            <Card.Content className="">
                <View className="mb-1 flex flex-row justify-between">
                    <Text className="flex-1 font-heading text-xl">
                        {receipt.store}
                    </Text>
                    <Text className="font-heading text-lg font-light">
                        {formatDate(receipt.purchaseDate!, DateStringFormat)}
                    </Text>
                </View>

                <Text className="mb-1 text-lg font-semibold">
                    CAD${Number(receipt.total).toFixed(2)}
                </Text>
                <View className="mt-1 flex">
                    <Button
                        className="shadow-sm"
                        icon="eye"
                        mode="outlined"
                        onPress={() => {
                            navigation.navigate('receipts/view', {
                                id: receipt.id,
                            });
                        }}
                    >
                        View Receipt
                    </Button>
                </View>
            </Card.Content>
        </Card>
    );
}
