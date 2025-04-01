import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DateInputField, FormInput, GroceryItemModal } from '~components';
import {
    Button,
    ButtonText,
    Heading,
    HStack,
    Text,
    VStack,
} from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { useGroceryModal } from '~hooks';
import { receiptSchema } from '~schemas';
import { GroceryItem, Receipt } from '~types';
import { formatDate, parseDate } from '~utils/date';

type ReceiptFormProps = {
    userId: number;
    receiptId?: number;
    initialValues?: Receipt | Omit<Receipt, 'id'>;
    onSubmit?: (values: Receipt | Omit<Receipt, 'id'>) => void;
};

export default function ReceiptForm({
    userId,
    receiptId,
    initialValues,
    onSubmit,
}: ReceiptFormProps) {
    const {
        createGroceryVisible,
        setCreateGroceryVisible,
        modifyGroceryItemVisible,
        setModifyGroceryItemVisible,
        editItemIndex,
        setEditItemIndex,
        handleGroceryItemSubmit,
    } = useGroceryModal();

    return (
        <Formik
            initialValues={{
                store: initialValues?.store || '',
                purchaseDate: initialValues?.purchaseDate || new Date(),
                total: initialValues?.total || 1,
                groceryItems:
                    initialValues?.groceryItems || ([] as GroceryItem[]),
            }}
            onSubmit={async (values, { resetForm }) => {
                const finalValues: Receipt = { userId, ...values };
                let calculatedTotal = 0;
                values.groceryItems.forEach((item) => {
                    calculatedTotal += Number(item.totalPrice!);
                    item.purchaseDate = finalValues.purchaseDate;
                });
                finalValues.total = calculatedTotal;
                if (receiptId) {
                    finalValues.id = receiptId;
                }
                onSubmit?.(finalValues);
                resetForm();
            }}
            validationSchema={receiptSchema}
        >
            {({
                handleSubmit,
                handleBlur,
                handleChange,
                values,
                errors,
                touched,
                setFieldValue,
            }) => (
                <VStack>
                    <FormInput
                        error={errors.store}
                        label="Store Name"
                        onBlur={handleBlur('store')}
                        onChangeText={handleChange('store')}
                        placeholder="Enter store name"
                        touched={touched.store}
                        value={String(values.store)}
                    />

                    <DateInputField
                        date={values.purchaseDate}
                        error={errors.purchaseDate}
                        isInvalid={
                            !!errors.purchaseDate && touched.purchaseDate
                        }
                        label="Purchase Date"
                        placeholder={
                            initialValues?.purchaseDate
                                ? formatDate(
                                      parseDate(initialValues?.purchaseDate),
                                      DateFormat,
                                  )
                                : 'Select a date'
                        }
                        setDate={(date) => setFieldValue('purchaseDate', date)}
                    />

                    <FormInput
                        error={errors.total}
                        label="Total ($)"
                        onBlur={() => {
                            handleChange('total')(
                                Number(values.total).toFixed(2),
                            );
                        }}
                        onChangeText={handleChange('total')}
                        placeholder="Enter total spent"
                        touched={touched.total}
                        value={String(values.total)}
                    />

                    <HStack className="mx-4 mt-2 flex items-center justify-between">
                        <Heading className="font-heading font-semibold xs:text-2xl xl:text-3xl">
                            Grocery Items
                        </Heading>
                        <Button
                            onPress={() =>
                                setCreateGroceryVisible(!createGroceryVisible)
                            }
                            variant="link"
                        >
                            <ButtonText className="mt-2 font-body text-lg text-typography-600">
                                Add Item
                            </ButtonText>
                        </Button>
                    </HStack>

                    <GroceryItemModal
                        initialValues={{
                            purchaseDate: values.purchaseDate || new Date(),
                        }}
                        isOpen={createGroceryVisible}
                        onClose={() => setCreateGroceryVisible(false)}
                        onSubmit={(groceryValues) => {
                            handleGroceryItemSubmit(
                                groceryValues,
                                -1,
                                values,
                                setFieldValue,
                            );
                            setCreateGroceryVisible(false);
                        }}
                        userId={userId}
                    />

                    <ScrollView className="mx-4 mt-4 max-h-[12rem] xl:mt-2 xl:max-h-[18rem]">
                        {values.groceryItems.map((groceryItem, index) => (
                            <VStack className="gap-3 pb-6" key={index}>
                                <HStack className="flex items-center justify-between">
                                    <Heading className="mt-2 font-heading font-medium">
                                        {groceryItem.name} (
                                        {groceryItem.quantity})
                                    </Heading>
                                    <Text className="mt-2 font-info">
                                        $
                                        {Number(groceryItem.totalPrice).toFixed(
                                            2,
                                        )}
                                    </Text>
                                </HStack>

                                <HStack>
                                    <Text className="font-info">
                                        Expires on{' '}
                                        {formatDate(
                                            parseDate(
                                                groceryItem.expiryDate as Date,
                                            ),
                                            DateFormat,
                                        )}
                                        .
                                    </Text>
                                </HStack>

                                <HStack className="flex items-center gap-2">
                                    <Button
                                        action="primary"
                                        className="w-28"
                                        onPress={() => {
                                            setEditItemIndex(index);
                                            setModifyGroceryItemVisible(true);
                                        }}
                                        size="md"
                                        variant="solid"
                                    >
                                        <MaterialCommunityIcons
                                            className="mb-1 ml-2"
                                            color="white"
                                            name="pencil"
                                            size={24}
                                        />
                                    </Button>

                                    <GroceryItemModal
                                        id={groceryItem.id}
                                        initialValues={groceryItem}
                                        isOpen={
                                            modifyGroceryItemVisible &&
                                            editItemIndex === index
                                        }
                                        onClose={() =>
                                            setModifyGroceryItemVisible(false)
                                        }
                                        onSubmit={(
                                            groceryValues: GroceryItem,
                                        ) => {
                                            handleGroceryItemSubmit(
                                                groceryValues,
                                                index,
                                                values,
                                                setFieldValue,
                                            );
                                            setModifyGroceryItemVisible(false);
                                        }}
                                        receiptId={receiptId}
                                        userId={userId}
                                    />

                                    <Button
                                        action="negative"
                                        className="w-28"
                                        onPress={() => {
                                            const filteredItems =
                                                values.groceryItems.filter(
                                                    (_, i) => i !== index,
                                                );
                                            setFieldValue(
                                                'groceryItems',
                                                filteredItems,
                                            );
                                        }}
                                        size="md"
                                        variant="solid"
                                    >
                                        <MaterialCommunityIcons
                                            className="mb-1 ml-2"
                                            color="white"
                                            name="trash-can"
                                            size={24}
                                        />
                                    </Button>
                                </HStack>
                            </VStack>
                        ))}
                    </ScrollView>

                    <HStack className="fixed bottom-0 left-0 right-0 mx-4 mb-1 mt-4">
                        <VStack className="w-full gap-3">
                            <Button
                                action="primary"
                                className="w-full"
                                onPress={handleSubmit}
                                variant="solid"
                            >
                                <ButtonText className="font-body xs:text-base xl:text-lg">
                                    Submit
                                </ButtonText>
                            </Button>
                        </VStack>
                    </HStack>
                </VStack>
            )}
        </Formik>
    );
}
