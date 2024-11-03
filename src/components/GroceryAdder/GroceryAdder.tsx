import { FormikErrors, FormikValues as Values } from 'formik';
import React, { useState } from 'react';
import { Text, View } from 'react-native';

import { Button } from 'react-native-paper';
import { GroceryItem } from '../../types/GroceryItem';
import GroceryModal from '../GroceryModal/GroceryModal';

type GroceryAdderProps = {
    initialValues?: GroceryItem | Partial<GroceryItem>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
    purchaseDate: Date | string;
};

type GroceryData = {
    groceryItems: Partial<GroceryItem>[] | GroceryItem[];
    item: Partial<GroceryItem> | GroceryItem;
    purchaseDate: Date | string;
};

const handleSubmit = async (
    data: GroceryData,
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>,
    setShowGroceryModal: React.Dispatch<React.SetStateAction<boolean>>,
) => {
    const { groceryItems, item, purchaseDate } = data;
    item.purchaseDate = purchaseDate;
    item.unitPrice =
        item.quantity && item.quantity > 1 && item.totalPrice
            ? Number((item.totalPrice / item.quantity).toFixed(2))
            : item.totalPrice;
    setFieldValue('groceryItems', [...groceryItems!, item]);
    setShowGroceryModal(false);
};

export default function GroceryAdder({ initialValues, setFieldValue, groceryItems, purchaseDate }: GroceryAdderProps) {
    const [showGroceryModal, setShowGroceryModal] = useState(false);

    return (
        <View className="px-2 mt-1 flex flex-row justify-between">
            <Text className="ml-2 mb-1 mt-2 text-text text-md font-semibold font-heading">Grocery Items</Text>
            <Button className="rounded-lg" onPress={() => setShowGroceryModal(true)}>
                Add Item
            </Button>
            <GroceryModal
                method="Add"
                visible={showGroceryModal}
                onDismiss={() => setShowGroceryModal(false)}
                onSubmit={(item: GroceryItem | Partial<GroceryItem>) =>
                    handleSubmit({ groceryItems, item, purchaseDate }, setFieldValue, setShowGroceryModal)
                }
            />
        </View>
    );
}
