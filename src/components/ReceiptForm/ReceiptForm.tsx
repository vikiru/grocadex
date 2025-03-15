import * as Yup from 'yup';

import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import DateSelector from '~components/DateSelector/DateSelector';
import GroceryAdder from '~components/GroceryAdder/GroceryAdder';
import GroceryContainer from '~components/GroceryContainer/GroceryContainer';
import { Receipt } from '~types/index';

const validationSchema = Yup.object({
    store: Yup.string().required('Must provide a store name'),
    purchaseDate: Yup.date().required('Must provide a valid purchase date'),
    total: Yup.number()
        .required('Total should not be 0')
        .positive('Total price must be positive'),
    groceryItems: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.number().required(),
                totalPrice: Yup.number().required(),
                unitPrice: Yup.number().required(),
                purchaseDate: Yup.date().required(),
                expiryDate: Yup.date().required(),
            }),
        )
        .required('No groceries added to receipt'),
});

const defaultValues = {
    store: '',
    purchaseDate: new Date(),
    total: 1.0,
    groceryItems: [],
};

type ReceiptFormProps = {
    initialValues?: Receipt | Partial<Receipt>;
    handleSubmit: any;
    loading: boolean;
    error: Error | null;
};

export default function ReceiptForm({
    initialValues,
    handleSubmit,
    loading,
    error,
}: ReceiptFormProps) {
    const values = { ...defaultValues, ...initialValues };

    return (
        <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={(data: Receipt | Partial<Receipt>) => {
                handleSubmit(data);
            }}
        >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
                <View className="flex min-h-full min-w-full bg-background pt-2">
                    <View className="mx-1">
                        <TextInput
                            className="mx-2 rounded-lg bg-white"
                            label="Store Name"
                            mode="outlined"
                            onChangeText={handleChange('store')}
                            placeholder="Enter the store name"
                            value={values.store}
                        />
                    </View>
                    <View className="mx-3">
                        <DateSelector
                            fieldName="purchaseDate"
                            label="Purchase Date"
                            setFieldValue={setFieldValue}
                        />
                    </View>
                    <View className="mx-1 mt-1">
                        <TextInput
                            className="mx-2 my-1 bg-white"
                            keyboardType="decimal-pad"
                            label="Total Price"
                            mode="outlined"
                            onChangeText={(total) => {
                                setFieldValue('total', total);
                            }}
                            value={values.total?.toString() || ''}
                        />
                    </View>
                    <GroceryAdder
                        setFieldValue={setFieldValue}
                        groceryItems={values.groceryItems || []}
                        purchaseDate={values.purchaseDate!}
                    />
                    {values.groceryItems && values.groceryItems.length > 0 && (
                        <GroceryContainer
                            groceryItems={values.groceryItems}
                            setFieldValue={setFieldValue}
                        />
                    )}
                    <View className="mt-2 flex-1 items-center justify-end pb-5">
                        <Button
                            className="rounded-lg"
                            mode="contained"
                            onPress={() => handleSubmit()}
                        >
                            Submit
                        </Button>
                    </View>
                </View>
            )}
        </Formik>
    );
}
