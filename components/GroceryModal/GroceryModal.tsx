import * as Yup from 'yup';

import { Modal, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { GroceryItem } from '../../types/GroceryItem';
import DatePicker from '../DatePicker/DatePicker';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    totalPrice: Yup.number().required('Total price is required').positive('Total price must be positive'),
    expiryDate: Yup.date().required('Expiry date is required'),
});

interface GroceryModalProps {
    visible: boolean;
    onDismiss: () => void;
    onSubmit: (item: GroceryItem | Partial<GroceryItem>) => void;
}

export default function GroceryModal({ visible, onDismiss, onSubmit }: GroceryModalProps) {
    const initialValues: GroceryItem | Partial<GroceryItem> = {
        name: '',
        quantity: 1,
        unitPrice: 1.0,
        expiryDate: new Date(),
    };

    return (
        <Modal visible={visible} onRequestClose={onDismiss} animationType="slide" transparent={true}>
            <StyledComponent component={View} className="flex-1 justify-center items-center bg-background">
                <StyledComponent component={View} className="rounded-lg p-4 mx-4 w-full max-w-md m-2">
                    <StyledComponent component={Text} className="ml-1 text-text text-lg font-semibold font-heading">
                        Add a new grocery item
                    </StyledComponent>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values: GroceryItem | Partial<GroceryItem>, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                            onDismiss();
                        }}
                    >
                        {({ handleChange, handleSubmit, setFieldValue, values }) => (
                            <StyledComponent component={View}>
                                <StyledComponent
                                    component={TextInput}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter the name of the grocery item"
                                    mode="outlined"
                                    className="bg-white my-1 ml-r"
                                />

                                <StyledComponent
                                    component={TextInput}
                                    label="Quantity"
                                    value={values.quantity?.toString()}
                                    onChangeText={(quantity) => setFieldValue('quantity', Number(quantity))}
                                    placeholder="Enter the quantity of the grocery item"
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white my-1"
                                />

                                <StyledComponent
                                    component={TextInput}
                                    label="Total Price"
                                    value={values.totalPrice?.toString()}
                                    onChangeText={(totalPrice) => setFieldValue('totalPrice', Number(totalPrice))}
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white my-1"
                                />

                                <DatePicker
                                    setFieldValue={setFieldValue}
                                    fieldName="expiryDate"
                                    label="Expiry Date"
                                    date={values.expiryDate!}
                                />

                                <StyledComponent component={View} className="flex-row mt-2 justify-end space-x-2">
                                    <StyledComponent
                                        component={Button}
                                        onPress={onDismiss}
                                        mode="outlined"
                                        className="bg-white"
                                    >
                                        Cancel
                                    </StyledComponent>
                                    <StyledComponent
                                        component={Button}
                                        onPress={() => handleSubmit()}
                                        mode="contained"
                                        className="bg-primary"
                                    >
                                        Add Item
                                    </StyledComponent>
                                </StyledComponent>
                            </StyledComponent>
                        )}
                    </Formik>
                </StyledComponent>
            </StyledComponent>
        </Modal>
    );
}
