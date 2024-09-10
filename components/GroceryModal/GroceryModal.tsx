import * as Yup from 'yup';

import { Modal, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { GroceryItem } from '../../types/GroceryItem';

interface GroceryModalProps {
    visible: boolean;
    onDismiss: () => void;
    onSubmit: (item: Partial<GroceryItem>) => void;
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be positive'),
    unitPrice: Yup.number().required('Unit price is required').positive('Unit price must be positive'),
    purchaseDate: Yup.date().required('Purchase date is required'),
    expiryDate: Yup.date().required('Expiry date is required'),
});

interface GroceryModalProps {
    visible: boolean;
    onDismiss: () => void;
    onSubmit: (item: GroceryItem | Partial<GroceryItem>) => void;
    groceryItems: GroceryItem | Partial<GroceryItem>[];
}

export default function GroceryModal({ visible, onDismiss, onSubmit }: GroceryModalProps) {
    const initialValues: Partial<GroceryItem> = {
        name: '',
        quantity: 0,
        unitPrice: 0,
        purchaseDate: new Date(),
        expiryDate: new Date(),
    };

    return (
        <Modal visible={visible} onRequestClose={onDismiss} animationType="slide" transparent={true}>
            <StyledComponent component={View} className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <StyledComponent component={View} className="bg-white rounded-lg p-4 mx-4 w-full max-w-md">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values: GroceryItem | Partial<GroceryItem>, { resetForm }) => {
                            onSubmit(values);
                            resetForm();
                            onDismiss();
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <StyledComponent component={View} className="space-y-4">
                                <StyledComponent
                                    component={TextInput}
                                    label="Item Name"
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    error={touched.name && !!errors.name}
                                    mode="outlined"
                                    className="bg-white"
                                />
                                {touched.name && errors.name && (
                                    <StyledComponent component={HelperText} type="error">
                                        {errors.name}
                                    </StyledComponent>
                                )}

                                <StyledComponent
                                    component={TextInput}
                                    label="Quantity"
                                    value={values.quantity!.toString()}
                                    onChangeText={handleChange('quantity')}
                                    onBlur={handleBlur('quantity')}
                                    error={touched.quantity && !!errors.quantity}
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white"
                                />
                                {touched.quantity && errors.quantity && (
                                    <StyledComponent component={HelperText} type="error">
                                        {errors.quantity}
                                    </StyledComponent>
                                )}

                                <StyledComponent
                                    component={TextInput}
                                    label="Unit Price"
                                    value={values.unitPrice!.toString()}
                                    onChangeText={handleChange('unitPrice')}
                                    onBlur={handleBlur('unitPrice')}
                                    error={touched.unitPrice && !!errors.unitPrice}
                                    keyboardType="numeric"
                                    mode="outlined"
                                    className="bg-white"
                                />
                                {touched.unitPrice && errors.unitPrice && (
                                    <StyledComponent component={HelperText} type="error">
                                        {errors.unitPrice}
                                    </StyledComponent>
                                )}

                                <StyledComponent
                                    component={TextInput}
                                    label="Purchase Date"
                                    value={values.purchaseDate!.toISOString().split('T')[0]}
                                    onChangeText={handleChange('purchaseDate')}
                                    onBlur={handleBlur('purchaseDate')}
                                    error={touched.purchaseDate && !!errors.purchaseDate}
                                    mode="outlined"
                                    className="bg-white"
                                />
                                {touched.purchaseDate && errors.purchaseDate && (
                                    <StyledComponent component={HelperText} type="error">
                                        {errors.purchaseDate}
                                    </StyledComponent>
                                )}

                                <StyledComponent
                                    component={TextInput}
                                    label="Expiry Date"
                                    value={values.expiryDate!.toISOString().split('T')[0]}
                                    onChangeText={handleChange('expiryDate')}
                                    onBlur={handleBlur('expiryDate')}
                                    error={touched.expiryDate && !!errors.expiryDate}
                                    mode="outlined"
                                    className="bg-white"
                                />
                                {touched.expiryDate && errors.expiryDate && (
                                    <StyledComponent component={HelperText} type="error">
                                        {errors.expiryDate}
                                    </StyledComponent>
                                )}

                                <StyledComponent component={View} className="flex-row justify-end space-x-2">
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
