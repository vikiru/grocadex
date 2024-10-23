import { Button, Card, Divider, Text } from 'react-native-paper';

import { router } from 'expo-router';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/GroceryItem';
import { formatDate } from '~utils/date';

export default function GroceryCard({ item }: { item: Partial<GroceryItem> | GroceryItem }) {
    const formatPrice = (price: number | undefined) => {
        return price ? `$${Number(price).toFixed(2)}` : 'N/A';
    };

    return (
        <StyledComponent component={Card} className="my-1 mx-2 bg-white shadow-md rounded-lg border-2 border-primary">
            <Card.Content>
                <StyledComponent component={View} className="flex-row justify-between items-start mb-2">
                    <StyledComponent
                        component={Text}
                        className="text-center text-base font-bold text-primary flex-1 mr-2 font-heading"
                    >
                        {item.name}
                    </StyledComponent>
                </StyledComponent>

                <StyledComponent component={View} className="flex-row justify-between items-end space-x-2">
                    <StyledComponent component={Text} className="text-sm text-gray-600 font-heading">
                        Quantity: {item.quantity || 'N/A'}
                    </StyledComponent>

                    <StyledComponent component={Text} className="text-md py-1 text-gray-600 font-heading">
                        |
                    </StyledComponent>

                    <StyledComponent component={Text} className="text-sm text-gray-600 font-heading">
                        Total: {formatPrice(item.totalPrice)}
                    </StyledComponent>
                </StyledComponent>

                <Divider />

                <StyledComponent component={View} className="mt-2">
                    <StyledComponent component={View} className="mb-1">
                        <StyledComponent component={Text} className="text-sm text-gray-500 font-subheading">
                            Purchased
                        </StyledComponent>
                        <StyledComponent component={Text} className="text-sm text-gray-700 font-body">
                            {formatDate(item.purchaseDate!, DateFormat)}
                        </StyledComponent>
                    </StyledComponent>

                    <StyledComponent component={View}>
                        <StyledComponent component={Text} className="text-sm text-gray-500 font-subheading">
                            Expires
                        </StyledComponent>
                        <StyledComponent component={Text} className="text-sm font-semibold text-red-400 font-body">
                            {formatDate(item.expiryDate!, DateFormat)}
                        </StyledComponent>
                    </StyledComponent>
                </StyledComponent>
            </Card.Content>

            <Card.Actions>
                <StyledComponent
                    component={Button}
                    icon="pencil"
                    mode="text"
                    className="bg-primary"
                    textColor="white"
                    onPress={() => {
                        router.push(`/grocery/${item.id}`);
                    }}
                >
                    Edit
                </StyledComponent>
                <StyledComponent
                    component={Button}
                    icon="delete"
                    mode="text"
                    className="bg-red-400"
                    textColor="white"
                    onPress={() => {}}
                >
                    Delete
                </StyledComponent>
            </Card.Actions>
        </StyledComponent>
    );
}
