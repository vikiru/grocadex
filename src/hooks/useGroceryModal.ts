import { FormikErrors } from 'formik';
import { useState } from 'react';
import { GroceryItem } from '~types';

export default function useGroceryModal() {
    const [createGroceryVisible, setCreateGroceryVisible] = useState(false);
    const [modifyGroceryItemVisible, setModifyGroceryItemVisible] =
        useState(false);
    const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

    const handleGroceryItemSubmit = (
        groceryValues: any,
        index: number = -1,
        values: any,
        setFieldValue: (
            field: string,
            value: any,
            shouldValidate?: boolean,
        ) => Promise<void | FormikErrors<any>>,
    ) => {
        const {
            name,
            quantity,
            unitPrice,
            totalPrice,
            purchaseDate,
            expiryDate,
        } = groceryValues;

        const newItem: Partial<GroceryItem> = {
            name,
            quantity: Number(quantity),
            unitPrice: Number(unitPrice),
            totalPrice: Number(totalPrice),
            purchaseDate:
                new Date(values.purchaseDate).toISOString() ||
                purchaseDate.toISOString(),
            expiryDate: expiryDate.toISOString(),
        };

        if (index === -1) {
            setFieldValue('groceryItems', [...values.groceryItems, newItem]);
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
