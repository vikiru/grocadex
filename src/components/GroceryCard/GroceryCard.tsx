import { Button, Card, Divider, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/index';
import { formatDate } from '~utils/date';

export default function GroceryCard({ item }: { item: Partial<GroceryItem> | GroceryItem }) {
    const navigation = useNavigation();

    const formatPrice = (price: number | undefined) => {
        return price ? `$${Number(price).toFixed(2)}` : 'N/A';
    };

    return (
        <Card className="my-1 mx-2 shadow-md rounded-lg border-2 border-primary">
            <Card.Content>
                <View className="flex-row justify-between items-start mb-2">
                    <Text className="text-center text-base font-bold text-primary flex-1 mr-2 font-heading">
                        {item.name}
                    </Text>
                </View>

                <View className="flex-row justify-between items-end space-x-2">
                    <Text className="text-sm text-gray-600 font-heading">Quantity: {item.quantity || 'N/A'}</Text>

                    <Text className="text-md text-gray-600 font-heading">|</Text>

                    <Text className="text-sm text-gray-600 font-heading">Total: {formatPrice(item.totalPrice)}</Text>
                </View>

                <Divider />

                <View className="mt-2">
                    <View className="mb-1">
                        <Text className="text-sm text-gray-500 font-subheading">Purchased</Text>
                        <Text className="text-sm text-gray-700 font-body">
                            {formatDate(item.purchaseDate!, DateFormat)}
                        </Text>
                    </View>

                    <View>
                        <Text className="text-sm text-gray-500 font-subheading">Expires</Text>
                        <Text className="text-sm font-semibold text-red-400 font-body">
                            {formatDate(item.expiryDate!, DateFormat)}
                        </Text>
                    </View>
                </View>
            </Card.Content>

            <Card.Actions>
                <Button
                    icon="pencil"
                    mode="text"
                    className="bg-primary"
                    buttonColor="green"
                    textColor="white"
                    onPress={() => {
                        navigation.navigate('grocery', {
                            id: item.id,
                        });
                    }}
                >
                    Edit
                </Button>
                <Button
                    icon="delete"
                    mode="text"
                    className="bg-red-400"
                    buttonColor="red"
                    textColor="white"
                    onPress={() => {}}
                >
                    Delete
                </Button>
            </Card.Actions>
        </Card>
    );
}
