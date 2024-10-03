import * as Yup from 'yup';

import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';
import DateSelector from '~components/DateSelector/DateSelector';
import GroceryAdder from '~components/GroceryAdder/GroceryAdder';
import GroceryContainer from '~components/GroceryContainer/GroceryContainer';
import useReceipts from '~hooks/components/useReceipts';
import { Receipt } from '~types/Receipt';

const validationSchema = Yup.object({
    store: Yup.string().required('Must provide a store name'),
    purchaseDate: Yup.date().required('Must provide a valid purchase date'),
    total: Yup.number().required('Total should not be 0').positive('Total price must be positive'),
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

// TODO: Add edit functionality for receipt.
// TODO: update api so that post and put return created/updated items. Optimize queries where possible, maintain consistent format

// TODO: update this to use the redux user id
// TODO: update this to use proper url
// TODO: separate item card and card container

const defaultValues = {
    store: '',
    purchaseDate: new Date(),
    total: 1.0,
    groceryItems: [],
};

type ReceiptFormProps = {
    initialValues: Receipt | Partial<Receipt>;
    handleSubmit?: any; // TODO: handle submit for creating and updating receipt (figure out how to update receipt and items either as a whole or receipt then items individually)
};

// TODO: handle submit as props similar to grocerymodal

export default function ReceiptForm({ initialValues }: ReceiptFormProps) {
    const { handleCreate, loading, error } = useReceipts();
    const values = { ...defaultValues, ...initialValues };

    return (
        <Formik
            initialValues={values}
            validationSchema={validationSchema}
            onSubmit={(data: Receipt | Partial<Receipt>) => {
                handleCreate(data);
            }}
        >
            {({ handleSubmit, handleChange, setFieldValue, values }) => (
                <StyledComponent component={View} className="bg-background min-h-full min-w-full flex pt-2">
                    <StyledComponent component={View} className="mx-1">
                        <StyledComponent
                            component={TextInput}
                            mode="outlined"
                            label="Store Name"
                            value={values.store}
                            onChangeText={handleChange('store')}
                            placeholder="Enter the store name"
                            className="bg-white rounded-lg mx-2"
                        />
                    </StyledComponent>
                    <StyledComponent component={View} className="mx-3">
                        <DateSelector setFieldValue={setFieldValue} fieldName="purchaseDate" label="Purchase Date" />
                    </StyledComponent>
                    <StyledComponent component={View} className="mt-1 mx-1">
                        <StyledComponent
                            component={TextInput}
                            label="Total Price"
                            value={values.total?.toString() || ''}
                            onChangeText={(total) => {
                                setFieldValue('total', total);
                            }}
                            keyboardType="decimal-pad"
                            mode="outlined"
                            className="bg-white my-1 mx-2"
                        />
                    </StyledComponent>
                    <GroceryAdder
                        setFieldValue={setFieldValue}
                        groceryItems={values.groceryItems || []}
                        purchaseDate={values.purchaseDate!}
                    />
                    {values.groceryItems && values.groceryItems.length > 0 && (
                        <GroceryContainer groceryItems={values.groceryItems} setFieldValue={setFieldValue} />
                    )}
                    <StyledComponent component={View} className="mt-2 flex-1 justify-end items-center pb-5">
                        <StyledComponent
                            component={Button}
                            className="rounded-lg"
                            mode="contained"
                            onPress={() => handleSubmit()}
                        >
                            Submit
                        </StyledComponent>
                    </StyledComponent>
                </StyledComponent>
            )}
        </Formik>
    );
}
