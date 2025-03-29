import { Formik } from 'formik';
import {
    Button,
    ButtonText,
    HStack,
    Input,
    InputField,
    Text,
    VStack,
} from '~components/ui';
import { useRegistration } from '~hooks';
import { signupValidationSchema } from '~schemas';

export default function RegistrationForm() {
    const { register } = useRegistration();

    return (
        <VStack>
            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                }}
                onSubmit={async (values, { resetForm }) => {
                    await register(values);
                    resetForm();
                }}
                validationSchema={signupValidationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <>
                        <HStack className="mx-4 mt-1">
                            <VStack className="w-full">
                                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                    First Name
                                </Text>
                                <HStack>
                                    <Input
                                        className="w-full bg-background-0 font-body"
                                        size="xl"
                                        variant="outline"
                                    >
                                        <InputField
                                            className="font-body"
                                            onBlur={handleBlur('firstName')}
                                            onChangeText={handleChange(
                                                'firstName',
                                            )}
                                            placeholder="Enter your first name"
                                            value={values.firstName}
                                        />
                                    </Input>
                                </HStack>
                                {touched.firstName && errors.firstName && (
                                    <Text className="text-sm text-error-500">
                                        {errors.firstName}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        <HStack className="mx-4 mt-1">
                            <VStack className="w-full">
                                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                    Last Name
                                </Text>
                                <HStack>
                                    <Input
                                        className="w-full bg-background-0 font-body"
                                        size="xl"
                                        variant="outline"
                                    >
                                        <InputField
                                            className="font-body"
                                            onBlur={handleBlur('lastName')}
                                            onChangeText={handleChange(
                                                'lastName',
                                            )}
                                            placeholder="Enter your last name"
                                            value={values.lastName}
                                        />
                                    </Input>
                                </HStack>
                                {touched.lastName && errors.lastName && (
                                    <Text className="text-sm text-error-500">
                                        {errors.lastName}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        <HStack className="mx-4 mt-1">
                            <VStack className="w-full">
                                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                    Username
                                </Text>
                                <HStack>
                                    <Input
                                        className="w-full bg-background-0 font-body"
                                        size="xl"
                                        variant="outline"
                                    >
                                        <InputField
                                            className="font-body"
                                            onBlur={handleBlur('username')}
                                            onChangeText={handleChange(
                                                'username',
                                            )}
                                            placeholder="Enter username"
                                            value={values.username}
                                        />
                                    </Input>
                                </HStack>
                                {touched.username && errors.username && (
                                    <Text className="text-sm text-error-500">
                                        {errors.username}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        <HStack className="mx-4 mt-1">
                            <VStack className="w-full">
                                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                    Email
                                </Text>
                                <HStack>
                                    <Input
                                        className="w-full bg-background-0 font-body"
                                        size="xl"
                                        variant="outline"
                                    >
                                        <InputField
                                            autoCapitalize="none"
                                            className="font-body"
                                            keyboardType="email-address"
                                            onBlur={handleBlur('email')}
                                            onChangeText={handleChange('email')}
                                            placeholder="Enter email"
                                            value={values.email}
                                        />
                                    </Input>
                                </HStack>
                                {touched.email && errors.email && (
                                    <Text className="text-sm text-error-500">
                                        {errors.email}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        <HStack className="mx-4 mt-1">
                            <VStack className="w-full">
                                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                                    Password
                                </Text>
                                <HStack>
                                    <Input
                                        className="w-full bg-background-0"
                                        size="xl"
                                        variant="outline"
                                    >
                                        <InputField
                                            className="font-body"
                                            onBlur={handleBlur('password')}
                                            onChangeText={handleChange(
                                                'password',
                                            )}
                                            placeholder="Enter password"
                                            secureTextEntry
                                            value={values.password}
                                        />
                                    </Input>
                                </HStack>
                                {touched.password && errors.password && (
                                    <Text className="text-sm text-error-500">
                                        {errors.password}
                                    </Text>
                                )}
                            </VStack>
                        </HStack>

                        <HStack className="mx-4 mt-4">
                            <VStack className="w-full gap-3">
                                <Button
                                    action="primary"
                                    onPress={handleSubmit}
                                    variant="solid"
                                >
                                    <ButtonText className="font-body xs:text-base xl:text-lg">
                                        Sign Up
                                    </ButtonText>
                                </Button>
                            </VStack>
                        </HStack>
                    </>
                )}
            </Formik>
        </VStack>
    );
}
