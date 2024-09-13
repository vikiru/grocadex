import { Button, Card, Divider, Text } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import { GroceryItem } from '../../types/GroceryItem';

export default function GroceryCard({ item }: { item: Partial<GroceryItem> | GroceryItem }) {
    const formatDate = (date: Date | undefined) => {
        return date ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'N/A';
    };

    const formatPrice = (price: number | undefined) => {
        return price ? `$${price.toFixed(2)}` : 'N/A';
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
                            {formatDate(item.purchaseDate)}
                        </StyledComponent>
                    </StyledComponent>

                    <StyledComponent component={View}>
                        <StyledComponent component={Text} className="text-sm text-gray-500 font-subheading">
                            Expires
                        </StyledComponent>
                        <StyledComponent component={Text} className="text-sm font-semibold text-red-400 font-body">
                            {formatDate(item.expiryDate)}
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
                    onPress={() => {}}
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
