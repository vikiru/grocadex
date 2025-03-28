import { loginValidationSchema } from '@/src/schema/userSchema';
import { Formik } from 'formik';
import { Button, ButtonText } from '~components/ui/button';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { useLogin } from '~hooks/index';

function LoginForm() {
    const { login } = useLogin();

    return (
        <VStack>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { resetForm }) => {
                    await login(values);
                    resetForm();
                }}
                validationSchema={loginValidationSchema}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                }) => (
                    <VStack>
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
                                            autoCapitalize="none"
                                            className="font-body"
                                            keyboardType="default"
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

                        <HStack className="mx-4 mt-4">
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
                                        Login
                                    </ButtonText>
                                </Button>
                            </VStack>
                        </HStack>
                    </VStack>
                )}
            </Formik>
        </VStack>
    );
}

export default LoginForm;
