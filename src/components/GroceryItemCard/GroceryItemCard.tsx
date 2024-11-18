import * as React from 'react';

import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Dialog from '~components/Dialog/Dialog';
import { useItem } from '~hooks/components';
import { GroceryItem } from '~types/index';
import { constructExpiryString } from '~utils/date';

// TODO: combine all grocery card vairants/refactor into single file, separate fns with one handler and reduce to two.

// TODO: fix this to work with active item and not delete the actual item from the receipt.

const deleteActiveItem = (
    id: number,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: any,
) => {
    setDialogVisible(false);
    handleDelete(id);
};

export default function GroceryItemCard({ item }: { item: GroceryItem | Partial<GroceryItem> }) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { handleDelete, loading, error } = useItem();
    const navigation = useNavigation();

    return (
        <Card className="border-2 border-primary bg-white shadow-md rounded-lg p-4 m-2">
            <Card.Content>
                <View className="flex flex-row justify-between">
                    <Text className="text-xl font-heading font-semibold">
                        {item.name} ({item.quantity})
                    </Text>
                    <Text className="text-xl font-heading text-text">${Number(item.totalPrice).toFixed(2)}</Text>
                </View>
                <Text className="text-lg mt-2 text-red-400 font-subheading">
                    {constructExpiryString(item.expiryDate!)}
                </Text>
            </Card.Content>
            <Card.Actions className="flex flex-row justify-between m-1">
                <Button
                    icon="pencil"
                    mode="text"
                    className="bg-primary w-1/2"
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
                    className="bg-red-400 w-1/2"
                    textColor="white"
                    onPress={() => {
                        setDialogVisible(true);
                    }}
                >
                    Delete
                </Button>

                {dialogVisible && (
                    <Dialog
                        visible={dialogVisible}
                        headerText="Delete Grocery Item"
                        bodyText="Are you sure you want to remove this grocery item from your active items?"
                        handleDelete={() => 'press'}
                        setDialogVisible={setDialogVisible}
                    />
                )}
            </Card.Actions>
        </Card>
    );
}
