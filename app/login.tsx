import * as Yup from 'yup';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, HelperText, TextInput as PaperTextInput } from 'react-native-paper';

import { router } from 'expo-router';
import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import Logo from '../components/Logo/Logo';
import usePostData from '../hooks/usePostData';
import { RequestPayload } from '../types/RequestPayload';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login() {
    const [displayPassword, setDisplayPassword] = useState(true);
    const { postData } = usePostData();

    const handleLogin = async (values: { username: string; password: string }) => {
        const payload: RequestPayload = {
            url: `${process.env.EXPO_PUBLIC_API_URL}/auth/login`,
            data: values,
        };

        console.log(payload);
        const data = await postData(payload);
        if (data?.status === 200) {
            router.push('/dashboard');
        }
    };

    const handleCancel = async () => {
        router.push('/');
    };

    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex">
            <Logo />
            <StyledComponent component={View} className="flex-row mx-auto my-2">
                <StyledComponent component={Text} className="text-text text-lg italic font-body text-center">
                    Welcome back! Ready to continue saving money and reducing waste together?
                </StyledComponent>
            </StyledComponent>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <>
                        <StyledComponent component={View} className="my-2 mx-4">
                            <PaperTextInput
                                label="Username"
                                value={values.username}
                                placeholder="Enter your username"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                mode="outlined"
                            />
                            <HelperText type="error" visible={touched.username && !!errors.username}>
                                {errors.username}
                            </HelperText>
                        </StyledComponent>

                        <StyledComponent component={View} className="my-2 mx-4">
                            <PaperTextInput
                                label="Password"
                                value={values.password}
                                secureTextEntry={displayPassword}
                                placeholder="Enter your password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                mode="outlined"
                                right={
                                    <PaperTextInput.Icon
                                        icon={displayPassword ? 'eye-off' : 'eye'}
                                        onPress={() => setDisplayPassword(!displayPassword)}
                                    />
                                }
                            />
                            <HelperText type="error" visible={touched.password && !!errors.password}>
                                {errors.password}
                            </HelperText>
                        </StyledComponent>

                        <StyledComponent component={View} className="lg:mx-auto">
                            <StyledComponent
                                component={Button}
                                icon="account-circle"
                                mode="elevated"
                                className="max-w-md lg:max-w-full my-2 mx-4 bg-primary"
                                textColor="black"
                                onPress={() => handleSubmit()}
                            >
                                Login
                            </StyledComponent>

                            <StyledComponent
                                component={Button}
                                icon="cancel"
                                mode="elevated"
                                className="max-w-md my-2 mx-4 bg-secondary"
                                textColor="white"
                                onPress={() => handleCancel()}
                            >
                                Cancel
                            </StyledComponent>
                        </StyledComponent>
                    </>
                )}
            </Formik>
        </StyledComponent>
    );
}
