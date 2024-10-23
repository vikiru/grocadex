import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { router } from 'expo-router';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { Receipt } from '../../types/Receipt';
import { DateStringFormat } from './../../constants/Dates';
import { formatDate } from './../../utils/date';

export default function ReceiptCard({ receipt }: { receipt: Receipt | Partial<Receipt> }) {
    return (
        <StyledComponent component={Card} className="m-2 rounded-lg bg-white border-primary border-2 shadow-md">
            <StyledComponent component={Card.Content} className="">
                <StyledComponent component={View} className="flex flex-row justify-between mb-1">
                    <StyledComponent component={Text} className="text-xl font-heading flex-1">
                        {receipt.store}
                    </StyledComponent>
                    <StyledComponent component={Text} className="font-heading font-light text-lg">
                        {formatDate(receipt.purchaseDate!, DateStringFormat)}
                    </StyledComponent>
                </StyledComponent>

                <StyledComponent component={Text} className="text-lg font-semibold mb-1">
                    CAD${Number(receipt.total!).toFixed(2)}
                </StyledComponent>
                <StyledComponent component={View} className="flex mt-1">
                    <StyledComponent
                        component={Button}
                        className="shadow-sm"
                        icon="eye"
                        mode="outlined"
                        onPress={() => {
                            router.push(`/receipt/${receipt.id}`);
                        }}
                    >
                        View Receipt
                    </StyledComponent>
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
