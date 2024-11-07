import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { useNavigation } from 'expo-router';
import Dialog from '~components/Dialog/Dialog';
import Loader from '~components/Loader/Loader';
import { DateStringFormat } from '~constants/Dates';
import useReceipts from '~hooks/components/useReceipts';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useReceipt } from '~hooks/redux/useReceipt';
import { GroceryItem } from '~types/GroceryItem';
import { formatDate } from '~utils/date';

// TODO: Update pages to handle default/new user (i.e. no receipts/expenses/items)
// TODO: fix styling (fonts, colorurs, etc)
// TODO: cleanup api and maintain consistent behavior, create custom ResponseType = {data, message, error}
// TODO: add aws, update readme, add docs, add logo and favicons, openapi docs
// TODO: cleanup dependencies, configs, fonts, add comments
// TODO: update grocery cards to be universal/consistent or max 2 components for this purpose. add view receipt functionality,
// search items

const deleteReceipt = (
    receiptId: number,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: any,
) => {
    setDialogVisible(false);
    handleDelete(receiptId);
};

export default function ReceiptViewScreen({ route }) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { receipts } = useReceipt();
    const { handleDelete, loading, error } = useReceipts();
    const { activeItems } = useActiveItem();
    const { id } = route.params;

    const receipt = receipts.find((receipt) => receipt.id === Number(id));
    const items = activeItems.filter((item) => item.receiptId === Number(id));
    const navigation = useNavigation();

    if (receipt) {
        return (
            <View className="bg-background min-h-screen min-w-screen">
                <View className="flex flex-row justify-between m-2">
                    <Text className="text-xl font-heading flex-1">{receipt.store}</Text>
                    <Text className="font-heading font-light text-lg">
                        {formatDate(receipt.purchaseDate!, DateStringFormat)}
                    </Text>
                </View>

                <View className="mx-2 mt-2 flex flex-row justify-between">
                    <Text className="text-2xl font-semibold mb-1">CAD${Number(receipt.total).toFixed(2)}</Text>
                    <Text className="text-lg font-subheading">{items.length} items</Text>
                </View>

                <Divider />

                <ScrollView className="mx-2 max-h-64 pb-2">
                    {items?.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                        <View key={item.id} className="mx-2 mt-1">
                            <View className="flex flex-row justify-between">
                                <Text className="font-body text-base">
                                    {index + 1}. {item.name} ({item.quantity})
                                </Text>
                                <Text className="font-subheading text-base">${Number(item.totalPrice).toFixed(2)}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View className="mt-6 flex-1 flex">
                    <Button
                        icon="pencil"
                        mode="elevated"
                        className="max-w-md bg-primary w-60 mx-auto h-10 mt-2"
                        textColor="white"
                        onPress={() =>
                            navigation.navigate('receipts/edit', {
                                id: receipt.id,
                            })
                        }
                    >
                        Edit
                    </Button>

                    <Button
                        icon="cancel"
                        mode="elevated"
                        className="max-w-md w-60 mx-auto h-10 mt-4 shadow-md bg-red-400"
                        textColor="white"
                        onPress={() => setDialogVisible(true)}
                    >
                        Delete
                    </Button>

                    {dialogVisible && (
                        <Dialog
                            visible={dialogVisible}
                            headerText="Delete Receipt"
                            bodyText="Are you sure you want to delete this receipt?"
                            handleDelete={() => deleteReceipt(receipt.id!, setDialogVisible, handleDelete)}
                            setDialogVisible={setDialogVisible}
                        />
                    )}
                </View>
            </View>
        );
    } else {
        return <Loader loading={loading} />;
    }
}
