import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { Receipt } from '../../types/Receipt';

function formatDate(date: Date | undefined): string {
    if (!date) return 'N/A';
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function ReceiptCard({ receipt }: { receipt: Receipt | Partial<Receipt> }) {
    return (
        <StyledComponent component={Card} className="m-2 rounded-lg">
            <StyledComponent component={Card.Content} className="">
                <StyledComponent component={View} className="flex flex-row justify-between">
                    <StyledComponent component={Text} className="text-lg font-semibold">
                        {receipt.store}
                    </StyledComponent>
                    <StyledComponent component={Text} className="text-lg text-text font-heading mx-10 mb-2">
                        ${receipt.total?.toFixed(2)}
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={View} className="flex flex-row justify-between">
                    <StyledComponent component={Text} className="mt-1 mb-2">
                        Purchased {receipt.groceryItems?.length} items on {formatDate(receipt.purchaseDate)}.
                    </StyledComponent>
                    <StyledComponent
                        component={Button}
                        mode="outlined"
                        icon="eye"
                        onPress={() => console.log('View details pressed')}
                        className=""
                    >
                        View Details
                    </StyledComponent>
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
