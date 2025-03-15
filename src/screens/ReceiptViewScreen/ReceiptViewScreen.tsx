import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import { Dialog, Loader } from '~components/index';
import { useActiveItem, useReceipt } from '~hooks/redux';
import { GroceryItem, Receipt } from '~types/index';

import { useNavigation } from 'expo-router';
import { DateStringFormat } from '~constants/Dates';
import { useReceipts } from '~hooks/components';
import { formatDate } from '~utils/date';

// TODO: Update pages to handle default/new user (i.e. no receipts/expenses/items)
// TODO: fix styling (fonts, colours, etc)
// TODO: cleanup api and maintain consistent behavior, create custom ResponseType = {data, message, error}
// TODO: add aws, update readme, add docs, add logo and favicons, openapi docs
// TODO: cleanup dependencies, configs, fonts, add comments
// TODO: search items

const deleteReceipt = (
    receiptId: number,
    setDialogVisible: React.Dispatch<React.SetStateAction<boolean>>,
    handleDelete: any,
) => {
    setDialogVisible(false);
    handleDelete(receiptId);
};

export default function ReceiptViewScreen({ route }: any) {
    const [dialogVisible, setDialogVisible] = useState(false);
    const { receipts } = useReceipt();
    const { handleDelete, loading, error } = useReceipts();
    const { activeItems } = useActiveItem();
    const { id } = route.params;

    const receipt = receipts.find(
        (receipt: Partial<Receipt> | Receipt) => receipt.id === Number(id),
    );
    const items = activeItems.filter(
        (item: GroceryItem | Partial<GroceryItem>) =>
            item.receiptId === Number(id),
    );
    const navigation = useNavigation();

    if (receipt) {
        return (
            <View className="min-w-screen min-h-screen bg-background">
                <View className="m-2 flex flex-row justify-between">
                    <Text className="flex-1 font-heading text-xl">
                        {receipt.store}
                    </Text>
                    <Text className="font-heading text-lg font-light">
                        {formatDate(receipt.purchaseDate!, DateStringFormat)}
                    </Text>
                </View>

                <View className="mx-2 mt-2 flex flex-row justify-between">
                    <Text className="mb-1 text-2xl font-semibold">
                        CAD${Number(receipt.total).toFixed(2)}
                    </Text>
                    <Text className="font-subheading text-lg">
                        {items.length} items
                    </Text>
                </View>

                <Divider />

                <ScrollView className="mx-2 max-h-64 pb-2">
                    {items?.map(
                        (
                            item: GroceryItem | Partial<GroceryItem>,
                            index: number,
                        ) => (
                            <View className="mx-2 mt-1" key={item.id}>
                                <View className="flex flex-row justify-between">
                                    <Text className="font-body text-base">
                                        {index + 1}. {item.name} (
                                        {item.quantity})
                                    </Text>
                                    <Text className="font-subheading text-base">
                                        ${Number(item.totalPrice).toFixed(2)}
                                    </Text>
                                </View>
                            </View>
                        ),
                    )}
                </ScrollView>

                <View className="mt-6 flex flex-1">
                    <Button
                        className="mx-auto mt-2 h-10 w-60 max-w-md bg-primary"
                        icon="pencil"
                        mode="elevated"
                        onPress={() =>
                            navigation.navigate('receipts/edit', {
                                id: receipt.id,
                            })
                        }
                        textColor="white"
                    >
                        Edit
                    </Button>

                    <Button
                        className="mx-auto mt-4 h-10 w-60 max-w-md bg-red-400 shadow-md"
                        icon="cancel"
                        mode="elevated"
                        onPress={() => setDialogVisible(true)}
                        textColor="white"
                    >
                        Delete
                    </Button>

                    {dialogVisible && (
                        <Dialog
                            visible={dialogVisible}
                            headerText="Delete Receipt"
                            bodyText="Are you sure you want to delete this receipt?"
                            handleDelete={() =>
                                deleteReceipt(
                                    receipt.id,
                                    setDialogVisible,
                                    handleDelete,
                                )
                            }
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
