import { FormikErrors } from 'formik';
import { useState } from 'react';

import { GroceryItem } from '@/types';

type GroceryFormValues = Partial<GroceryItem> & {
    quantity?: string | number;
    unitPrice?: string | number;
    totalPrice?: string | number;
    groceryItems?: Partial<GroceryItem>[];
};

export default function useGroceryModal() {
    const [createGroceryVisible, setCreateGroceryVisible] = useState(false);
    const [modifyGroceryItemVisible, setModifyGroceryItemVisible] = useState(false);
    const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

    const handleGroceryItemSubmit = (
        groceryValues: GroceryFormValues,
        index: number = -1,
        values: GroceryFormValues,
        setFieldValue: (
            field: string,
            value: unknown,
            shouldValidate?: boolean,
        ) => Promise<void | FormikErrors<GroceryFormValues>>,
    ) => {
        const { name, quantity, unitPrice, totalPrice, purchaseDate, expiryDate } = groceryValues;

        const newItem: Partial<GroceryItem> = {
            name,
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
            totalPrice: Number(totalPrice),
            purchaseDate,
            expiryDate,
        };

        if (index === -1) {
            setFieldValue('groceryItems', [...(values.groceryItems ?? []), newItem]);
        } else {
            setFieldValue(`groceryItems.${index}`, newItem);
        }
    };

    return {
        createGroceryVisible,
        setCreateGroceryVisible,
        modifyGroceryItemVisible,
        setModifyGroceryItemVisible,
        editItemIndex,
        setEditItemIndex,
        handleGroceryItemSubmit,
    };
}
