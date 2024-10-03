import * as React from 'react';

import { Text, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

import { router } from 'expo-router';
import { StyledComponent } from 'nativewind';
import { useState } from 'react';
import Dialog from '~components/Dialog/Dialog';
import useItem from '~hooks/components/useItem';
import { GroceryItem } from '~types/GroceryItem';
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

    return (
        <StyledComponent component={Card} className="border-2 border-primary bg-white shadow-md rounded-lg p-4 m-2">
            <Card.Content>
                <StyledComponent component={View} className="flex flex-row justify-between">
                    <StyledComponent component={Text} className="text-xl font-heading font-semibold">
                        {item.name} ({item.quantity})
                    </StyledComponent>
                    <StyledComponent component={Text} className="text-xl font-heading text-text">
                        ${Number(item.totalPrice).toFixed(2)}
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={Text} className="text-lg mt-2 text-red-400 font-subheading">
                    {constructExpiryString(item.expiryDate!)}
                </StyledComponent>
            </Card.Content>
            <StyledComponent component={Card.Actions} className="flex flex-row justify-between m-1">
                <StyledComponent
                    component={Button}
                    icon="pencil"
                    mode="text"
                    className="bg-primary w-1/2"
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
                    className="bg-red-400 w-1/2"
                    textColor="white"
                    onPress={() => {
                        setDialogVisible(true);
                    }}
                >
                    Delete
                </StyledComponent>

                {dialogVisible && (
                    <Dialog
                        visible={dialogVisible}
                        headerText="Delete Grocery Item"
                        bodyText="Are you sure you want to remove this grocery item from your active items?"
                        handleDelete={() => console.log('press')}
                        setDialogVisible={setDialogVisible}
                    />
                )}
            </StyledComponent>
        </StyledComponent>
    );
}
