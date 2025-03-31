import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DateInputField, GroceryForm } from '~components';
import {
    Button,
    ButtonText,
    Heading,
    HStack,
    Input,
    InputField,
    Modal,
    ModalBackdrop,
    ModalContent,
    Text,
    VStack,
} from '~components/ui';

import { DateFormat } from '~constants/Dates';
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
    const [createGroceryVisible, setCreateGroceryVisible] = useState(false);
    const [modifyGroceryItemVisible, setModifyGroceryItemVisible] =
        useState(false);
    const [editItemIndex, setEditItemIndex] = useState<number | null>(null);

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
                values.groceryItems.map((item, index) => {
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
                    <HStack className="mx-4 mt-1">
                        <VStack className="w-full">
                            <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                Name
                            </Text>
                            <Input
                                className="w-full bg-background-0 font-body"
                                size="xl"
                                variant="outline"
                            >
                                <InputField
                                    isInvalid={!!errors.store && touched.store}
                                    onBlur={handleBlur('store')}
                                    onChangeText={handleChange('store')}
                                    placeholder="Enter store name"
                                    value={String(values.store)}
                                />
                            </Input>
                            {!!errors.store && touched.store && (
                                <Text className="text-error-500">
                                    {errors.store}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

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

                    <HStack className="mx-4 mt-1">
                        <VStack className="w-full">
                            <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                Total ($)
                            </Text>
                            <Input
                                className="w-full bg-background-0 font-body"
                                size="xl"
                                variant="outline"
                            >
                                <InputField
                                    isInvalid={!!errors.total && touched.total}
                                    onBlur={() => {
                                        handleChange('total')(
                                            Number(values.total).toFixed(2),
                                        );
                                    }}
                                    onChangeText={handleChange('total')}
                                    placeholder="Enter total spent"
                                    value={values.total}
                                />
                            </Input>
                            {!!errors.total && touched.total && (
                                <Text className="text-error-500">
                                    {errors.total}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

                    <HStack className="mx-4 mt-2 flex items-center justify-between">
                        <Heading className="font-heading font-semibold xs:text-2xl xl:text-3xl">
                            Grocery Items
                        </Heading>
                        <Button variant="link">
                            <ButtonText
                                className="mt-2 font-body text-lg text-typography-600"
                                onPress={() =>
                                    setCreateGroceryVisible(
                                        !createGroceryVisible,
                                    )
                                }
                            >
                                Add Item
                            </ButtonText>
                        </Button>
                    </HStack>

                    {createGroceryVisible && (
                        <Modal
                            isOpen={createGroceryVisible}
                            onClose={() => setCreateGroceryVisible(false)}
                        >
                            <ModalBackdrop
                                onClick={() => setCreateGroceryVisible(false)}
                            />
                            <ModalContent>
                                <GroceryForm
                                    initialValues={{
                                        purchaseDate:
                                            values.purchaseDate || new Date(),
                                    }}
                                    onSubmit={(groceryValues) => {
                                        const name = groceryValues.name;
                                        const quantity = Number(
                                            groceryValues.quantity,
                                        );
                                        const unitPrice: number =
                                            Number(groceryValues.unitPrice) ||
                                            Number(
                                                (
                                                    Number(
                                                        groceryValues.totalPrice,
                                                    ) /
                                                    Number(
                                                        groceryValues.quantity,
                                                    )
                                                ).toFixed(2),
                                            );
                                        const totalPrice = Number(
                                            groceryValues.totalPrice,
                                        );
                                        const purchaseDate = new Date(
                                            values.purchaseDate,
                                        ).toISOString();
                                        const expiryDate = new Date(
                                            groceryValues.expiryDate,
                                        ).toISOString();

                                        const newGroceryItem: Partial<GroceryItem> =
                                            {
                                                name,
                                                quantity,
                                                unitPrice,
                                                totalPrice,
                                                purchaseDate,
                                                expiryDate,
                                            };
                                        setFieldValue('groceryItems', [
                                            ...values.groceryItems,
                                            newGroceryItem,
                                        ]);
                                        setCreateGroceryVisible(false);
                                    }}
                                    userId={userId}
                                />
                            </ModalContent>
                        </Modal>
                    )}

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
                                        Expires on {groceryItem.expiryDate}.
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

                                    {modifyGroceryItemVisible &&
                                        editItemIndex === index && (
                                            <Modal
                                                isOpen={
                                                    modifyGroceryItemVisible
                                                }
                                                onClose={() =>
                                                    setModifyGroceryItemVisible(
                                                        false,
                                                    )
                                                }
                                            >
                                                <ModalBackdrop
                                                    onClick={() =>
                                                        setModifyGroceryItemVisible(
                                                            false,
                                                        )
                                                    }
                                                />
                                                <ModalContent>
                                                    <GroceryForm
                                                        id={groceryItem.id}
                                                        initialValues={{
                                                            purchaseDate:
                                                                values.purchaseDate ||
                                                                new Date(),
                                                            name: values
                                                                .groceryItems[
                                                                index
                                                            ].name,
                                                            quantity:
                                                                values
                                                                    .groceryItems[
                                                                    index
                                                                ].quantity,
                                                            unitPrice:
                                                                values
                                                                    .groceryItems[
                                                                    index
                                                                ].unitPrice,
                                                            totalPrice:
                                                                values
                                                                    .groceryItems[
                                                                    index
                                                                ].totalPrice,
                                                            expiryDate:
                                                                values
                                                                    .groceryItems[
                                                                    index
                                                                ].expiryDate,
                                                        }}
                                                        onSubmit={(
                                                            groceryValues,
                                                        ) => {
                                                            const name =
                                                                groceryValues.name;
                                                            const quantity =
                                                                Number(
                                                                    groceryValues.quantity,
                                                                );
                                                            const unitPrice: number =
                                                                Number(
                                                                    groceryValues.unitPrice,
                                                                ) ||
                                                                Number(
                                                                    (
                                                                        Number(
                                                                            groceryValues.totalPrice,
                                                                        ) /
                                                                        Number(
                                                                            groceryValues.quantity,
                                                                        )
                                                                    ).toFixed(
                                                                        2,
                                                                    ),
                                                                );
                                                            const totalPrice =
                                                                Number(
                                                                    groceryValues.totalPrice,
                                                                );
                                                            const purchaseDate =
                                                                new Date(
                                                                    values.purchaseDate,
                                                                ).toISOString();
                                                            const expiryDate =
                                                                new Date(
                                                                    groceryValues.expiryDate,
                                                                ).toISOString();

                                                            const updatedGroceryItem: Partial<GroceryItem> =
                                                                {
                                                                    name,
                                                                    quantity,
                                                                    unitPrice,
                                                                    totalPrice,
                                                                    purchaseDate,
                                                                    expiryDate,
                                                                };
                                                            setFieldValue(
                                                                `groceryItems.${index}`,
                                                                updatedGroceryItem,
                                                            );
                                                            setModifyGroceryItemVisible(
                                                                false,
                                                            );
                                                        }}
                                                        receiptId={receiptId}
                                                        userId={userId}
                                                    />
                                                </ModalContent>
                                            </Modal>
                                        )}

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
                                onPress={() => {
                                    handleSubmit();
                                }}
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
