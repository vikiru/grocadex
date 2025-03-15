import * as Yup from 'yup';

import { Modal, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import React from 'react';
import DateSelector from '~components/DateSelector/DateSelector';
import { GroceryItem } from '~types/index';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be positive'),
    totalPrice: Yup.number()
        .required('Total price is required')
        .positive('Total price must be positive'),
    expiryDate: Yup.date().required('Expiry date is required'),
});

type GroceryModalProps = {
    method: string;
    initialValues?: GroceryItem | Partial<GroceryItem>;
    visible: boolean;
    onDismiss: () => void;
    onSubmit: any;
};

const defaultValues: GroceryItem | Partial<GroceryItem> = {
    name: '',
    quantity: 1,
    unitPrice: 1.0,
    totalPrice: 1.0,
    expiryDate: new Date(),
};

export default function GroceryModal({
    method,
    initialValues,
    visible,
    onDismiss,
    onSubmit,
}: GroceryModalProps) {
    const values = { ...defaultValues, ...initialValues };

    return (
        <Modal
            animationType="slide"
            onRequestClose={onDismiss}
            transparent={true}
            visible={visible}
        >
            <View className="flex-1 items-center justify-center bg-background">
                <View className="m-2 mx-4 w-full max-w-md rounded-lg p-4">
                    <Text className="ml-1 font-heading text-lg font-semibold text-text">
                        {method} a grocery item
                    </Text>
                    <Formik
                        initialValues={values}
                        onSubmit={(
                            values: GroceryItem | Partial<GroceryItem>,
                            { resetForm },
                        ) => {
                            values.totalPrice = parseFloat(
                                values.totalPrice!.toString(),
                            );
                            values.unitPrice = parseFloat(
                                (values.totalPrice / values.quantity!).toFixed(
                                    2,
                                ),
                            );
                            onSubmit(values);
                            resetForm();
                            onDismiss();
                        }}
                        validationSchema={validationSchema}
                    >
                        {({
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                            values,
                        }) => (
                            <View>
                                <TextInput
                                    className="ml-r my-1 bg-white"
                                    mode="outlined"
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter the name of the grocery item"
                                    value={values.name}
                                />

                                <TextInput
                                    className="my-1 bg-white"
                                    keyboardType="numeric"
                                    label="Quantity"
                                    mode="outlined"
                                    onChangeText={(quantity: string) =>
                                        setFieldValue(
                                            'quantity',
                                            Number(quantity),
                                        )
                                    }
                                    placeholder="Enter the quantity of the grocery item"
                                    value={values.quantity?.toString()}
                                />

                                <TextInput
                                    className="my-1 bg-white"
                                    keyboardType="numeric"
                                    label="Total Price"
                                    mode="outlined"
                                    onChangeText={(totalPrice: string) => {
                                        setFieldValue(
                                            'totalPrice',
                                            Number(totalPrice),
                                        );
                                    }}
                                    value={values.totalPrice?.toString()}
                                />

                                <DateSelector
                                    setFieldValue={setFieldValue}
                                    fieldName="expiryDate"
                                    label="Expiry Date"
                                />

                                <View className="mt-2 flex-row justify-end space-x-2">
                                    <Button
                                        className="bg-white"
                                        mode="outlined"
                                        onPress={onDismiss}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-primary"
                                        mode="contained"
                                        onPress={() => handleSubmit()}
                                    >
                                        {method} Item
                                    </Button>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </View>
        </Modal>
    );
}
