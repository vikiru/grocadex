import * as React from 'react';

import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Dialog from '~components/Dialog/Dialog';
import { useItem } from '~hooks/components';
import { GroceryItem } from '~types/index';
import { constructExpiryString } from '~utils/date';

// TODO: fix this to work with active item and not delete the actual item from the receipt.

const deleteActiveItem = (
    receiptId: number,
    groceryItemId: number,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: any,
) => {
    setDialogVisible(false);
    handleDelete(receiptId, groceryItemId);
};

export default function GroceryItemCard({
    item,
}: {
    item: GroceryItem | Partial<GroceryItem>;
}) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { handleDelete, loading, error } = useItem();
    const navigation = useNavigation();

    return (
        <Card className="m-2 rounded-lg border-2 border-primary p-4 shadow-md">
            <Card.Content>
                <View className="flex flex-row justify-between">
                    <Text className="font-heading text-xl font-semibold">
                        {item.name} ({item.quantity})
                    </Text>
                    <Text className="font-heading text-xl text-text">
                        ${Number(item.totalPrice).toFixed(2)}
                    </Text>
                </View>
                <Text className="mt-2 font-subheading text-lg text-red-400">
                    {constructExpiryString(item.expiryDate!)}
                </Text>
            </Card.Content>
            <Card.Actions className="m-1 flex flex-row justify-between">
                <Button
                    buttonColor="green"
                    className="w-1/2 bg-primary"
                    icon="pencil"
                    mode="text"
                    onPress={() => {
                        navigation.navigate('grocery', {
                            id: item.id,
                        });
                    }}
                    textColor="white"
                >
                    Edit
                </Button>
                <Button
                    buttonColor="red"
                    className="w-1/2 bg-red-400"
                    icon="delete"
                    mode="text"
                    onPress={() => {
                        setDialogVisible(true);
                    }}
                    textColor="white"
                >
                    Delete
                </Button>

                {dialogVisible && (
                    <Dialog
                        visible={dialogVisible}
                        headerText="Delete Grocery Item"
                        bodyText="Are you sure you want to remove this grocery item from your active items?"
                        handleDelete={() =>
                            deleteActiveItem(
                                item.receiptId,
                                item.id,
                                setDialogVisible,
                                handleDelete,
                            )
                        }
                        setDialogVisible={setDialogVisible}
                    />
                )}
            </Card.Actions>
        </Card>
    );
}
