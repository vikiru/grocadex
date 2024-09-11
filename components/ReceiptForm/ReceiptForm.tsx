import * as Yup from 'yup';

import { ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { router } from 'expo-router';
import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { DateFormat } from '../../constants/Dates';
import { GroceryItem } from '../../types/GroceryItem';
import { Receipt } from '../../types/Receipt';
import { RequestPayload } from '../../types/RequestPayload';
import { formatDate } from '../../utils/date';
import DatePicker from '../DatePicker/DatePicker';
import GroceryAdder from '../GroceryAdder/GroceryAdder';
import { usePostData } from './../../hooks/usePostData';

const validationSchema = Yup.object({
    store: Yup.string().required('Must provide a store name'),
    purchaseDate: Yup.date().required('Must provide a valid purchase date'),
    total: Yup.number().required('Total should not be 0'),
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

export default function ReceiptForm() {
    const { postData } = usePostData();
    return (
        <Formik
            initialValues={{ store: '', purchaseDate: new Date(), total: 1, groceryItems: [] }}
            validationSchema={validationSchema}
            onSubmit={async (value: Receipt | Partial<Receipt>) => {
                value.groceryItems?.forEach((item: GroceryItem | Partial<GroceryItem>) => {
                    item.purchaseDate = value.purchaseDate;
                });

                const payload: RequestPayload = {
                    url: `http://10.0.0.94:3000/api/v1/receipts`, // TODO: update this to use proper url
                    data: { ...value, userId: 1 }, // TODO: update this to use the redux user id
                };

                const data = await postData(payload);

                // TODO: add toast and setimeout for success
                if (data?.status === 201) {
                    router.push('/receipt');
                }
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
                        <DatePicker
                            setFieldValue={setFieldValue}
                            fieldName="purchaseDate"
                            label="Purchase Date"
                            date={values.purchaseDate!}
                        />
                    </StyledComponent>

                    <StyledComponent component={View} className="mt-1 mx-1">
                        <StyledComponent
                            component={TextInput}
                            label="Total Spent ($)"
                            mode="outlined"
                            keyboardType="decimal-pad"
                            value={values.total?.toString()}
                            onChangeText={(total) => setFieldValue('total', Number(total))}
                            placeholder="Enter your total spent"
                            className="bg-white rounded-lg mx-2"
                        />
                    </StyledComponent>

                    <GroceryAdder
                        setFieldValue={setFieldValue}
                        groceryItems={values.groceryItems || []}
                        purchaseDate={values.purchaseDate!}
                    />

                    {values.groceryItems && values.groceryItems.length > 0 && (
                        <StyledComponent component={ScrollView} className="flex flex-1 mx-2 pb-40">
                            {values.groceryItems.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                                <StyledComponent
                                    key={index}
                                    component={View}
                                    className="bg-white border border-gray-200 rounded-md p-2 mx-2 my-1"
                                >
                                    <StyledComponent component={View} className="flex-row justify-between items-center">
                                        <StyledComponent
                                            component={Text}
                                            className="font-semibold text-sm text-gray-800 flex-1"
                                        >
                                            {item.name}
                                        </StyledComponent>
                                        <StyledComponent component={Text} className="text-xs text-gray-500">
                                            Qty: {item.quantity}
                                        </StyledComponent>
                                    </StyledComponent>

                                    <StyledComponent
                                        component={View}
                                        className="flex-row justify-between items-center mt-1"
                                    >
                                        <StyledComponent component={Text} className="text-xs text-gray-600">
                                            ${item.unitPrice} each
                                        </StyledComponent>
                                        <StyledComponent component={Text} className="text-sm font-semibold text-text">
                                            Total: ${item.totalPrice}
                                        </StyledComponent>
                                    </StyledComponent>

                                    <StyledComponent
                                        component={View}
                                        className="flex-row justify-between items-center mt-1"
                                    >
                                        <StyledComponent component={Text} className="text-xs text-gray-500">
                                            Purchased: {formatDate(item.purchaseDate!, DateFormat)}
                                        </StyledComponent>
                                        <StyledComponent component={Text} className="text-xs text-red-500">
                                            Expires: {formatDate(item.expiryDate!, DateFormat)}
                                        </StyledComponent>
                                    </StyledComponent>

                                    <StyledComponent
                                        component={View}
                                        className="flex-row justify-between items-center mt-1"
                                    >
                                        <StyledComponent component={Button} className="rounded-lg">
                                            <StyledComponent component={Text} className="text-xs text-gray-500">
                                                Edit
                                            </StyledComponent>
                                        </StyledComponent>
                                        <StyledComponent component={Button} className="rounded-lg">
                                            <StyledComponent component={Text} className="text-xs text-gray-500">
                                                Delete
                                            </StyledComponent>
                                        </StyledComponent>
                                    </StyledComponent>
                                </StyledComponent>
                            ))}
                        </StyledComponent>
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
