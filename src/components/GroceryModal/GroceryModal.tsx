import * as Yup from 'yup';

import { Modal, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import React from 'react';
import { GroceryItem } from '../../types/GroceryItem';
import DateSelector from '../DateSelector/DateSelector';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    totalPrice: Yup.number().required('Total price is required').positive('Total price must be positive'),
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

export default function GroceryModal({ method, initialValues, visible, onDismiss, onSubmit }: GroceryModalProps) {
    const values = { ...defaultValues, ...initialValues };

    return (
        <Modal visible={visible} onRequestClose={onDismiss} animationType="slide" transparent={true}>
            <View className="flex-1 justify-center items-center bg-background">
                <View className="rounded-lg p-4 mx-4 w-full max-w-md m-2">
                    <Text className="ml-1 text-text text-lg font-semibold font-heading">{method} a grocery item</Text>
                    <Formik
                        initialValues={values}
                        validationSchema={validationSchema}
                        onSubmit={(values: GroceryItem | Partial<GroceryItem>, { resetForm }) => {
                            values.totalPrice = parseFloat(values.totalPrice!.toString());
                            values.unitPrice = parseFloat((values.totalPrice / values.quantity!).toFixed(2));
                            onSubmit(values);
                            resetForm();
                            onDismiss();
                        }}
                    >
                        {({ handleChange, handleSubmit, setFieldValue, values }) => (
                            <View>
                                <TextInput
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter the name of the grocery item"
                                    mode="outlined"
                                    className="bg-white my-1 ml-r"
                                />

                                <TextInput
                                    label="Quantity"
                                    value={values.quantity?.toString()}
                                    onChangeText={(quantity: string) => setFieldValue('quantity', Number(quantity))}
                                    placeholder="Enter the quantity of the grocery item"
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white my-1"
                                />

                                <TextInput
                                    label="Total Price"
                                    value={values.totalPrice?.toString()}
                                    onChangeText={(totalPrice: string) => {
                                        setFieldValue('totalPrice', Number(totalPrice));
                                    }}
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white my-1"
                                />

                                <DateSelector
                                    setFieldValue={setFieldValue}
                                    fieldName="expiryDate"
                                    label="Expiry Date"
                                />

                                <View className="flex-row mt-2 justify-end space-x-2">
                                    <Button onPress={onDismiss} mode="outlined" className="bg-white">
                                        Cancel
                                    </Button>
                                    <Button onPress={() => handleSubmit()} mode="contained" className="bg-primary">
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
