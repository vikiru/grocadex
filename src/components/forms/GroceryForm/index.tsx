import { Formik } from 'formik';
import { DateInputField, FormInput } from '~components';
import { Button, ButtonText, HStack, VStack } from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { grocerySchema } from '~schemas';
import { GroceryItem } from '~types';
import { formatDate, parseDate } from '~utils/date';

type GroceryFormProps = {
    id?: number;
    userId: number;
    receiptId?: number;
    initialValues?: Partial<GroceryItem>;
    onSubmit: (
        values:
            | GroceryItem
            | Pick<
                  GroceryItem,
                  | 'name'
                  | 'expiryDate'
                  | 'quantity'
                  | 'unitPrice'
                  | 'totalPrice'
              >,
    ) => Promise<void>;
};

export default function GroceryForm({
    id,
    userId,
    receiptId,
    initialValues,
    onSubmit,
}: GroceryFormProps) {
    return (
        <Formik
            initialValues={{
                name: initialValues?.name || '',
                quantity: initialValues?.quantity || 1,
                purchaseDate: initialValues?.purchaseDate || new Date(),
                expiryDate: initialValues?.expiryDate || new Date(),
                unitPrice: initialValues?.unitPrice || 1,
                totalPrice: initialValues?.totalPrice || 1,
                isActive: initialValues?.isActive || true,
            }}
            onSubmit={(values, { resetForm }) => {
                const totalPrice =
                    values.quantity && values.unitPrice
                        ? values.quantity * values.unitPrice
                        : values.totalPrice;
                values.totalPrice = totalPrice;

                if (id && receiptId) {
                    const finalValues: GroceryItem = {
                        id,
                        receiptId,
                        userId,
                        ...values,
                    };
                    onSubmit(finalValues);
                } else {
                    onSubmit(values);
                }

                resetForm();
            }}
            validationSchema={grocerySchema}
        >
            {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                errors,
                touched,
                isSubmitting,
            }) => (
                <VStack>
                    <FormInput
                        error={errors.name}
                        label="Name"
                        onBlur={handleBlur('name')}
                        onChangeText={handleChange('name')}
                        placeholder="Enter item name"
                        touched={touched.name}
                        value={String(values.name)}
                    />

                    <FormInput
                        error={errors.quantity}
                        label="Quantity"
                        onBlur={handleBlur('quantity')}
                        onChangeText={handleChange('quantity')}
                        placeholder="Enter quantity"
                        touched={touched.quantity}
                        value={values.quantity}
                    />

                    <DateInputField
                        date={values.expiryDate}
                        error={errors.expiryDate}
                        isInvalid={!!errors.expiryDate && touched.expiryDate}
                        label="Expiry Date"
                        placeholder={
                            initialValues?.expiryDate
                                ? formatDate(
                                      parseDate(initialValues?.expiryDate),
                                      DateFormat,
                                  )
                                : 'Select a date'
                        }
                        setDate={(date) => setFieldValue('expiryDate', date)}
                    />

                    <FormInput
                        error={errors.unitPrice}
                        label="Unit Price"
                        onBlur={() => {
                            handleChange('unitPrice')(
                                Number(values.unitPrice).toFixed(2),
                            );
                        }}
                        onChangeText={(value) =>
                            setFieldValue('unitPrice', value)
                        }
                        placeholder="Enter unit price"
                        touched={touched.unitPrice}
                        value={values.unitPrice}
                    />

                    <FormInput
                        error={errors.totalPrice}
                        label="Total Price"
                        onBlur={() => {
                            handleChange('totalPrice')(
                                Number(values.totalPrice).toFixed(2),
                            );
                        }}
                        onChangeText={(value) =>
                            setFieldValue('totalPrice', value)
                        }
                        placeholder="Enter total price of the item"
                        touched={touched.totalPrice}
                        value={values.totalPrice}
                    />

                    <HStack className="mx-4 mt-4">
                        <VStack className="w-full gap-3">
                            <Button
                                action="primary"
                                isDisabled={isSubmitting}
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
