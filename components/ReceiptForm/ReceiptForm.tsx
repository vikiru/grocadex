import * as Yup from 'yup';

import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import { SelectList } from 'react-native-dropdown-select-list';
import { GroceryItem } from '../../types/GroceryItem';
import { createDateFromTimestamp } from '../../utils/date';
import GroceryModal from '../GroceryModal/GroceryModal';
import { Stores } from './../../constants/Stores';

const validationSchema = Yup.object({
    store: Yup.string().required(),
    purchaseDate: Yup.date().required(),
    total: Yup.number().required(),
});

export default function ReceiptForm() {
    const [purchaseString, setPurchaseString] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [groceryItems, setGroceryItems] = useState<GroceryItem[] | Partial<GroceryItem>[]>([]);
    const [showGroceryModal, setShowGroceryModal] = useState(false);
    const handleSubmit = (values: any) => {
        console.log(values);
    };

    return (
        <Formik
            initialValues={{ name: '', store: '', purchaseDate: new Date(), total: 0 }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ handleChange, handleBlur, setFieldValue, values }) => (
                <StyledComponent component={ScrollView} className="bg-background min-h-full min-w-full flex pt-2">
                    <StyledComponent component={View} className="px-2">
                        <StyledComponent
                            component={Text}
                            className="ml-1 mb-1 text-text text-md font-semibold font-heading"
                        >
                            Store
                        </StyledComponent>

                        <StyledComponent component={View} className="relative flex-1 w-full">
                            <StyledComponent
                                component={SelectList}
                                data={Stores}
                                setSelected={(item: { label: string; value: string }) => {
                                    setFieldValue('store', item.value);
                                }}
                                search={false}
                                save="value"
                                className="bg-white border border-gray-300 rounded-md"
                            />
                        </StyledComponent>
                    </StyledComponent>

                    <StyledComponent component={View} className="px-2 mt-1">
                        <StyledComponent component={Text} className="ml-1 text-text text-md font-semibold font-heading">
                            Purchase Date
                        </StyledComponent>

                        <StyledComponent
                            component={TextInput}
                            label="Purchase Date"
                            mode="outlined"
                            value={purchaseString}
                            onPress={() => setShowDatePicker(true)}
                            placeholder="Enter your purchase date"
                            className="bg-white rounded-lg"
                        />

                        {showDatePicker && (
                            <DateTimePicker
                                value={values.purchaseDate}
                                mode="date"
                                display="spinner"
                                onChange={(date) => {
                                    const millis = date.nativeEvent.timestamp;
                                    const selectedDate = createDateFromTimestamp(millis);
                                    setFieldValue('purchaseDate', selectedDate);
                                    setPurchaseString(selectedDate.toLocaleDateString());
                                    setShowDatePicker(false);
                                }}
                            />
                        )}
                    </StyledComponent>

                    <StyledComponent component={View} className="px-2 mt-1">
                        <StyledComponent
                            component={Text}
                            className="ml-1 mb-1 text-text text-md font-semibold font-heading"
                        >
                            Total Spent ($)
                        </StyledComponent>

                        <StyledComponent
                            component={TextInput}
                            mode="outlined"
                            keyboardType="decimal-pad"
                            value={values.total.toString()}
                            onChangeText={handleChange('total')}
                            onBlur={handleBlur('total')}
                            placeholder="Enter your total spent"
                            className="bg-white rounded-lg"
                        />
                    </StyledComponent>
                    <StyledComponent component={View} className="px-2 mt-1 flex flex-row justify-between">
                        <StyledComponent
                            component={Text}
                            className="ml-1 mb-1 mt-1 text-text text-md font-semibold font-heading"
                        >
                            Grocery Items
                        </StyledComponent>
                        <GroceryModal
                            visible={showGroceryModal}
                            onDismiss={() => setShowGroceryModal(false)}
                            onSubmit={(item: GroceryItem | Partial<GroceryItem>) => {
                                setGroceryItems([...groceryItems, item]);
                                setShowGroceryModal(false);
                            }}
                            groceryItems={groceryItems}
                        />
                    </StyledComponent>

                    <StyledComponent
                        component={Button}
                        className="rounded-lg"
                        onPress={() => setShowGroceryModal(true)}
                    >
                        Add Item
                    </StyledComponent>

                    <StyledComponent component={View} className="flex flex-1 m-4 border-2 border-primary">
                        {groceryItems.map((item: GroceryItem | Partial<GroceryItem>) => (
                            <StyledComponent
                                key={item.id}
                                component={View}
                                className="bg-white border border-gray-200 rounded-md p-2 mb-2"
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
                                    <StyledComponent component={Text} className="text-sm font-semibold text-primary">
                                        Total: ${item.totalPrice}
                                    </StyledComponent>
                                </StyledComponent>

                                <StyledComponent
                                    component={View}
                                    className="flex-row justify-between items-center mt-1"
                                >
                                    <StyledComponent component={Text} className="text-xs text-gray-500">
                                        Purchased: {item.purchaseDate?.toLocaleDateString()}
                                    </StyledComponent>
                                    <StyledComponent component={Text} className="text-xs text-red-500">
                                        Expires: {item.expiryDate?.toLocaleDateString()}
                                    </StyledComponent>
                                </StyledComponent>
                            </StyledComponent>
                        ))}
                    </StyledComponent>
                </StyledComponent>
            )}
        </Formik>
    );
}
