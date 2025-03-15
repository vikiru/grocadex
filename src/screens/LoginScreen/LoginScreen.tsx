import * as Yup from 'yup';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import { Logo } from '~components/index';
import { useLogin } from '~hooks/components/useLogin';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function LoginScreen() {
    const [displayPassword, setDisplayPassword] = useState(true);
    const { handleLogin, handleCancel } = useLogin();

    return (
        <View className="mt-10 flex min-h-full min-w-full bg-background">
            <Logo />
            <View className="mx-auto my-2 mb-3 flex-row">
                <Text className="text-center font-body text-lg text-gray-600">
                    Welcome back! Ready to continue saving money and reducing
                    waste together?
                </Text>
            </View>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <TextInput
                            className="mx-4 my-1 border-2 border-primary bg-white font-body"
                            label="Username"
                            onBlur={handleBlur('username')}
                            onChangeText={handleChange('username')}
                            placeholder="Enter your username"
                            value={values.username}
                        />

                        <TextInput
                            className="mx-4 my-1 border-2 border-primary bg-white font-body"
                            label="Password"
                            onBlur={handleBlur('password')}
                            onChangeText={handleChange('password')}
                            placeholder="Enter your password"
                            right={
                                <TextInput.Icon
                                    icon={displayPassword ? 'eye-off' : 'eye'}
                                    onPress={() =>
                                        setDisplayPassword(!displayPassword)
                                    }
                                />
                            }
                            secureTextEntry={displayPassword}
                            value={values.password}
                        />

                        <View className="mt-2 lg:mx-auto">
                            <Button
                                className="mx-auto my-2 w-60 max-w-md bg-primary"
                                icon="account-circle"
                                mode="elevated"
                                onPress={() => handleSubmit()}
                                textColor="white"
                            >
                                Login
                            </Button>

                            <Button
                                className="mx-auto my-2 w-60 max-w-md bg-secondary"
                                icon="cancel"
                                mode="elevated"
                                onPress={() => handleCancel()}
                                textColor="white"
                            >
                                Cancel
                            </Button>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}
