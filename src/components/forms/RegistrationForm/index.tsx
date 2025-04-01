import { Formik } from 'formik';
import { FormInput } from '~components';
import { Button, ButtonText, HStack, VStack } from '~components/ui';
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
                        <FormInput
                            error={errors.firstName}
                            label="First Name"
                            onBlur={handleBlur('firstName')}
                            onChangeText={handleChange('firstName')}
                            placeholder="Enter your first name"
                            touched={touched.firstName}
                            value={values.firstName}
                        />
                        <FormInput
                            error={errors.lastName}
                            label="Last Name"
                            onBlur={handleBlur('lastName')}
                            onChangeText={handleChange('lastName')}
                            placeholder="Enter your last name"
                            touched={touched.lastName}
                            value={values.lastName}
                        />
                        <FormInput
                            error={errors.username}
                            label="Username"
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')}
                            placeholder="Enter your username"
                            touched={touched.username}
                            value={values.username}
                        />
                        <FormInput
                            error={errors.email}
                            label="Email"
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            placeholder="Enter your email"
                            touched={touched.email}
                            value={values.email}
                        />
                        <FormInput
                            error={errors.password}
                            label="Password"
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            placeholder="Enter your password"
                            secure={true}
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
