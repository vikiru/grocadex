import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { useLocalSearchParams } from 'expo-router';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { DateStringFormat } from '~constants/Dates';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useReceipt } from '~hooks/redux/useReceipt';
import { GroceryItem } from '~types/GroceryItem';
import { formatDate } from '~utils/date';

// TODO: add view/delete grocery and receipt functionality
// TODO: fix styling (fonts, colorurs, etc)
// TODO: connect frontend to backend
// TODO: add aws, update readme, add docs, add logo and favicons, openapi docs
// TODO: cleanup dependencies, configs, fonts, add sample env, add comments
// TODO: update grocery cards to be universal/consistent or max 2 components for this purpose. add view receipt functionality,
// search items

export default function ReceiptView() {
    const { receipts } = useReceipt();
    const { activeItems } = useActiveItem();
    const local = useLocalSearchParams();
    const { id } = local;
    const receipt = receipts.find((receipt) => receipt.id === Number(id));
    const items = activeItems.filter((item) => item.receiptId === Number(id));

    return (
        <StyledComponent component={View} className="bg-background min-h-screen min-w-screen">
            <StyledComponent component={View} className="flex flex-row justify-between m-2">
                <StyledComponent component={Text} className="text-xl font-heading flex-1">
                    {receipt!.store!}
                </StyledComponent>
                <StyledComponent component={Text} className="font-heading font-light text-lg">
                    {formatDate(receipt!.purchaseDate!, DateStringFormat)}
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="mx-2 mt-2 flex flex-row justify-between">
                <StyledComponent component={Text} className="text-2xl font-semibold mb-1">
                    CAD${Number(receipt!.total!).toFixed(2)}
                </StyledComponent>
                <StyledComponent component={Text} className="text-lg font-subheading">
                    {items.length} items
                </StyledComponent>
            </StyledComponent>

            <Divider />

            <StyledComponent component={ScrollView} className="mx-2 max-h-64 pb-2">
                {items?.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                    <StyledComponent component={View} key={item.id} className="mx-2 mt-1">
                        <StyledComponent component={View} className="flex flex-row justify-between">
                            <StyledComponent component={Text} className="font-body text-base">
                                {index + 1}. {item.name} ({item.quantity})
                            </StyledComponent>
                            <StyledComponent component={Text} className="font-subheading text-base">
                                ${Number(item.totalPrice).toFixed(2)}
                            </StyledComponent>
                        </StyledComponent>
                    </StyledComponent>
                ))}
            </StyledComponent>

            <StyledComponent component={View} className="mt-6 flex-1 flex">
                <StyledComponent
                    component={Button}
                    icon="pencil"
                    mode="elevated"
                    className="max-w-md bg-primary w-60 mx-auto h-10 mt-2"
                    textColor="white"
                >
                    Edit
                </StyledComponent>

                <StyledComponent
                    component={Button}
                    icon="cancel"
                    mode="elevated"
                    className="max-w-md w-60 mx-auto h-10 mt-4 shadow-md bg-red-400"
                    textColor="white"
                >
                    Delete
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
