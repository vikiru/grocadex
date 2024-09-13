import { FormikErrors, FormikValues as Values } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import { Button } from 'react-native-paper';
import { GroceryItem } from '../../types/GroceryItem';
import GroceryModal from '../GroceryModal/GroceryModal';

interface GroceryAdderProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
    purchaseDate: Date;
}

export default function GroceryAdder({ setFieldValue, groceryItems, purchaseDate }: GroceryAdderProps) {
    const [showGroceryModal, setShowGroceryModal] = useState(false);

    return (
        <StyledComponent component={View} className="px-2 mt-1 flex flex-row justify-between">
            <StyledComponent component={Text} className="ml-2 mb-1 mt-2 text-text text-md font-semibold font-heading">
                Grocery Items
            </StyledComponent>
            <StyledComponent component={Button} className="rounded-lg" onPress={() => setShowGroceryModal(true)}>
                Add Item
            </StyledComponent>
            <GroceryModal
                visible={showGroceryModal}
                onDismiss={() => setShowGroceryModal(false)}
                onSubmit={(item: GroceryItem | Partial<GroceryItem>) => {
                    item.purchaseDate = purchaseDate;
                    item.unitPrice =
                        item.quantity && item.quantity > 1 && item.totalPrice
                            ? Number((item.totalPrice / item.quantity).toFixed(2))
                            : item.totalPrice;
                    setFieldValue('groceryItems', [...groceryItems!, item]);
                    setShowGroceryModal(false);
                }}
            />
        </StyledComponent>
    );
}
