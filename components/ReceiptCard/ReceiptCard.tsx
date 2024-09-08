import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { Receipt } from '../../types/Receipt';

export function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ReceiptCard({ receipt }: { receipt: Receipt | Partial<Receipt> }) {
    return (
        <StyledComponent component={Card} className="m-2 rounded-lg bg-white border-primary border-2 shadow-md">
            <StyledComponent component={Card.Content} className="">
                <StyledComponent component={View} className="flex flex-row justify-between">
                    <StyledComponent component={Text} className="text-xl font-semibold font-heading">
                        {receipt.store}
                    </StyledComponent>
                    <StyledComponent component={Text} className="text-xl font-heading text-text md:mx-10 mb-2">
                        ${receipt.total?.toFixed(2)}
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={View} className="flex md:flex-row md:justify-between">
                    <StyledComponent
                        component={Text}
                        className="mt-1 mb-3 max-w-sm pr-2 text-text text-lg font-subheading"
                    >
                        Purchased {receipt.groceryItems?.length} items on {formatDate(receipt.purchaseDate)}.
                    </StyledComponent>
                    <StyledComponent
                        component={Button}
                        mode="outlined"
                        icon="eye"
                        onPress={() => console.log('View details pressed')}
                        className="bg-primary"
                        textColor="white"
                    >
                        View Details
                    </StyledComponent>
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
