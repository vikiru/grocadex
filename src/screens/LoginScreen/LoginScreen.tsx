import * as Yup from 'yup';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import Logo from '~components/Logo/Logo';
import { useLogin } from '~hooks/components/useLogin';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function LoginScreen() {
    const [displayPassword, setDisplayPassword] = useState(true);
    const { handleLogin, handleCancel } = useLogin();

    return (
        <View className="bg-background min-h-full min-w-full flex mt-10">
            <Logo />
            <View className="flex-row mx-auto my-2 mb-3">
                <Text className="text-gray-600 text-lg font-body text-center">
                    Welcome back! Ready to continue saving money and reducing waste together?
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
                            label="Username"
                            value={values.username}
                            placeholder="Enter your username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            className="my-1 mx-4 font-body bg-white border-2 border-primary"
                        />

                        <TextInput
                            label="Password"
                            value={values.password}
                            secureTextEntry={displayPassword}
                            placeholder="Enter your password"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            right={
                                <TextInput.Icon
                                    icon={displayPassword ? 'eye-off' : 'eye'}
                                    onPress={() => setDisplayPassword(!displayPassword)}
                                />
                            }
                            className="my-1 mx-4 font-body bg-white border-2 border-primary"
                        />

                        <View className="lg:mx-auto mt-2">
                            <Button
                                icon="account-circle"
                                mode="elevated"
                                className="max-w-md my-2 mx-auto bg-primary w-60"
                                textColor="white"
                                onPress={() => handleSubmit()}
                            >
                                Login
                            </Button>

                            <Button
                                icon="cancel"
                                mode="elevated"
                                className="max-w-md my-2 w-60 bg-secondary mx-auto"
                                textColor="white"
                                onPress={() => handleCancel()}
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
