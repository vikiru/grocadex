import { Formik } from 'formik';
import DateInputField from '~components/DateInputField';
import { Button, ButtonText } from '~components/ui/button';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { DateFormat } from '~constants/Dates';
import { grocerySchema } from '~schemas/index';
import { GroceryItem } from '~types/GroceryItem';
import { formatDate, parseDate } from '~utils/date';

type GroceryFormProps = {
    id?: number;
    userId: number;
    receiptId?: number;
    initialValues?: Partial<GroceryItem>;
    onSubmit?: (
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

function GroceryForm({
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
            }}
            onSubmit={(values, { resetForm }) => {
                if (onSubmit) {
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
                                    isInvalid={!!errors.name && touched.name}
                                    onBlur={handleBlur('name')}
                                    onChangeText={handleChange('name')}
                                    placeholder="Enter name of grocery item"
                                    value={String(values.name)}
                                />
                            </Input>
                            {!!errors.name && touched.name && (
                                <Text className="text-error-500">
                                    {errors.name}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

                    <HStack className="mx-4 mt-1">
                        <VStack className="w-full">
                            <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                Quantity
                            </Text>
                            <Input
                                className="w-full bg-background-0 font-body"
                                size="xl"
                                variant="outline"
                            >
                                <InputField
                                    isInvalid={
                                        !!errors.quantity && touched.quantity
                                    }
                                    onBlur={handleBlur('quantity')}
                                    onChangeText={handleChange('quantity')}
                                    placeholder="Enter quantity"
                                    value={String(values.quantity)}
                                />
                            </Input>
                            {!!errors.quantity && touched.quantity && (
                                <Text className="text-error-500">
                                    {errors.quantity}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

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

                    <HStack className="mx-4 mt-1">
                        <VStack className="w-full">
                            <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                Unit Price
                            </Text>
                            <Input
                                className="w-full bg-background-0 font-body"
                                size="xl"
                                variant="outline"
                            >
                                <InputField
                                    isInvalid={
                                        !!errors.unitPrice && touched.unitPrice
                                    }
                                    onBlur={handleBlur('unitPrice')}
                                    onChangeText={(value: string) => {
                                        setFieldValue('unitPrice', value);
                                    }}
                                    placeholder="Enter unit price"
                                    value={values.unitPrice}
                                />
                            </Input>
                            {errors.unitPrice && touched.unitPrice && (
                                <Text className="text-error-500">
                                    {errors.unitPrice}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

                    <HStack className="mx-4 mt-1">
                        <VStack className="w-full">
                            <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                Total Price
                            </Text>
                            <Input
                                className="w-full bg-background-0 font-body"
                                size="xl"
                                variant="outline"
                            >
                                <InputField
                                    isInvalid={
                                        !!errors.totalPrice &&
                                        touched.totalPrice
                                    }
                                    keyboardType="numeric"
                                    onBlur={handleBlur('totalPrice')}
                                    onChangeText={(value: string) => {
                                        setFieldValue('totalPrice', value);
                                    }}
                                    placeholder="Enter total price of the item"
                                    value={values.totalPrice}
                                />
                            </Input>
                            {errors.totalPrice && touched.totalPrice && (
                                <Text className="text-error-500">
                                    {errors.totalPrice}
                                </Text>
                            )}
                        </VStack>
                    </HStack>

                    <HStack className="mx-4 mt-4">
                        <VStack className="w-full gap-3">
                            <Button
                                action="primary"
                                disabled={isSubmitting}
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

export default GroceryForm;
