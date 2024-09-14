import * as Yup from 'yup';

import { ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { router } from 'expo-router';
import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import React from 'react';
import DateSelector from '~components/DateSelector/DateSelector';
import GroceryAdder from '~components/GroceryAdder/GroceryAdder';
import { DateFormat } from '~constants/Dates';
import { usePostData } from '~hooks/api/usePostData';
import { GroceryItem } from '~types/GroceryItem';
import { Receipt } from '~types/Receipt';
import { RequestPayload } from '~types/RequestPayload';
import { formatDate } from '~utils/date';

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

// TODO: Add edit/delete functionality, delete modal popup that can be customized via props.
// TODO: add toast and setimeout for success
// TODO: update this to use the redux user id
// TODO: update this to use proper url
// TODO: separate item card and card container

export default function ReceiptForm() {
    const { postData } = usePostData();
    return (
        <Formik
            initialValues={{ store: '', purchaseDate: new Date(), total: 1.0, groceryItems: [] }}
            validationSchema={validationSchema}
            onSubmit={async (value: Receipt | Partial<Receipt>) => {
                value.groceryItems?.forEach((item: GroceryItem | Partial<GroceryItem>) => {
                    item.purchaseDate = value.purchaseDate;
                });

                const payload: RequestPayload = {
                    url: `http://10.0.0.94:3000/api/v1/receipts`,
                    data: { ...value, userId: 1 },
                };

                const data = await postData(payload);

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
                        <StyledComponent component={ScrollView} className="flex flex-1 mx-2 max-h-60 pb-20">
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
                                            {item.name} ({item.quantity})
                                        </StyledComponent>
                                        <StyledComponent component={Text} className="text-sm font-semibold text-text">
                                            CAD${item.totalPrice}
                                        </StyledComponent>
                                    </StyledComponent>

                                    <StyledComponent
                                        component={View}
                                        className="flex-row justify-between items-center mt-1"
                                    >
                                        <StyledComponent component={Text} className="text-xs text-gray-600">
                                            ${item.unitPrice} each
                                        </StyledComponent>
                                        <StyledComponent component={Text} className="text-xs text-red-500">
                                            Expires: {formatDate(item.expiryDate!, DateFormat)}
                                        </StyledComponent>
                                    </StyledComponent>

                                    <StyledComponent
                                        component={View}
                                        className="flex-row justify-between items-center mt-1"
                                    >
                                        <StyledComponent component={Button} icon="pencil" className="rounded-lg">
                                            Edit
                                        </StyledComponent>
                                        <StyledComponent component={Button} icon="cancel" className="rounded-lg">
                                            Delete
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
