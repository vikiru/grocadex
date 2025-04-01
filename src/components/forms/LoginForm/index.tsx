import { Formik } from 'formik';
import { FormInput } from '~components';
import { Button, ButtonText, HStack, VStack } from '~components/ui';
import { useLogin } from '~hooks';
import { loginValidationSchema } from '~schemas';

export default function LoginForm() {
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
                        <FormInput
                            error={errors.username}
                            label="Username"
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')}
                            placeholder="Enter username"
                            touched={touched.username}
                            value={values.username}
                        />

                        <FormInput
                            error={errors.password}
                            label="Password"
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            placeholder="Enter password"
                            secure
                            touched={touched.password}
                            value={values.password}
                        />

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
