import * as React from 'react';

import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import { GroceryItem } from '../../types/GroceryItem';
import { formatDate } from '../ReceiptCard/ReceiptCard';

export default function GroceryItemCard({ item }: { item: GroceryItem | Partial<GroceryItem> }) {
    return (
        <StyledComponent component={Card} className="border-2 border-primary bg-white shadow-md rounded-lg p-4 m-2">
            <Card.Content>
                <StyledComponent component={View} className="flex flex-row justify-between">
                    <StyledComponent component={Text} className="text-xl font-heading font-semibold">
                        {item.name} ({item.quantity})
                    </StyledComponent>
                    <StyledComponent component={Text} className="text-xl font-heading text-text">
                        ${item.totalPrice}
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={Text} className="text-lg mt-2 text-red-400 font-subheading">
                    Expiring on {formatDate(item.expiryDate)}
                </StyledComponent>
            </Card.Content>
            <StyledComponent component={Card.Actions} className="flex flex-row justify-between m-1">
                <StyledComponent
                    component={Button}
                    icon="pencil"
                    mode="text"
                    className="bg-primary w-1/2"
                    textColor="white"
                    onPress={() => {}}
                >
                    Edit
                </StyledComponent>
                <StyledComponent
                    component={Button}
                    icon="delete"
                    mode="text"
                    className="bg-red-400 w-1/2"
                    textColor="white"
                    onPress={() => {}}
                >
                    Delete
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
