import { Button, Card, Divider, Text } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/index';
import { formatDate } from '~utils/date';

export default function GroceryCard({
    item,
}: {
    item: GroceryItem | Partial<GroceryItem>;
}) {
    const navigation = useNavigation();

    const formatPrice = (price: number | undefined) => {
        return price ? `$${Number(price).toFixed(2)}` : 'N/A';
    };

    return (
        <Card className="mx-2 my-1 rounded-lg border-2 border-primary shadow-md">
            <Card.Content>
                <View className="mb-2 flex-row items-start justify-between">
                    <Text className="mr-2 flex-1 text-center font-heading text-base font-bold text-primary">
                        {item.name}
                    </Text>
                </View>

                <View className="flex-row items-end justify-between space-x-2">
                    <Text className="font-heading text-sm text-gray-600">
                        Quantity: {item.quantity || 'N/A'}
                    </Text>

                    <Text className="text-md font-heading text-gray-600">
                        |
                    </Text>

                    <Text className="font-heading text-sm text-gray-600">
                        Total: {formatPrice(item.totalPrice)}
                    </Text>
                </View>

                <Divider />

                <View className="mt-2">
                    <View className="mb-1">
                        <Text className="font-subheading text-sm text-gray-500">
                            Purchased
                        </Text>
                        <Text className="font-body text-sm text-gray-700">
                            {formatDate(item.purchaseDate!, DateFormat)}
                        </Text>
                    </View>

                    <View>
                        <Text className="font-subheading text-sm text-gray-500">
                            Expires
                        </Text>
                        <Text className="font-body text-sm font-semibold text-red-400">
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
