import { Formik } from 'formik';
import DateInputField from '~components/DateInputField';
import { Button, ButtonText } from '~components/ui/button';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { grocerySchema } from '~schemas/index';
import { GroceryItem } from '~types/GroceryItem';

type GroceryFormProps = {
    initialValues?: Partial<GroceryItem>;
    onSubmit?: (values: Partial<GroceryItem>) => void;
};

// TODO:
// - dates are fixed now. Need to fix submit
// - add grocery item, update item and delete item. ensure everything is logged then move onto to fixing other forms
// - create modify grocery/receipt form

function GroceryForm({ initialValues, onSubmit }: GroceryFormProps) {
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
                        date={values.purchaseDate}
                        error={errors.purchaseDate}
                        isInvalid={
                            !!errors.purchaseDate && touched.purchaseDate
                        }
                        label="Purchase Date"
                        setDate={(date) => setFieldValue('purchaseDate', date)}
                    />

                    <DateInputField
                        date={values.purchaseDate}
                        error={errors.purchaseDate}
                        isInvalid={
                            !!errors.purchaseDate && touched.purchaseDate
                        }
                        label="Expiry Date"
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
