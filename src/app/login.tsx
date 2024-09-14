import * as Yup from 'yup';

import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { router } from 'expo-router';
import { Formik } from 'formik';
import { StyledComponent } from 'nativewind';
import Logo from '~components/Logo/Logo';
import usePostData from '~hooks/api/usePostData';
import { RequestPayload } from '~types/RequestPayload';

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function Login() {
    const [displayPassword, setDisplayPassword] = useState(true);
    const { postData } = usePostData();

    const handleLogin = async (values: { username: string; password: string }) => {
        const payload: RequestPayload = {
            // TODO: change this to ipv4 for mobile to desktop local testing
            url: `http://10.0.0.94:3000/api/v1/auth/login`,
            data: values,
        };

        console.log(payload);

        const data = await postData(payload);
        console.log(data);
        if (data?.status === 200) {
            router.push('/dashboard');
        }
    };

    const handleCancel = async () => {
        router.push('/');
    };

    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex mt-10">
            <Logo />
            <StyledComponent component={View} className="flex-row mx-auto my-2 mb-3">
                <StyledComponent component={Text} className="text-gray-600 text-lg font-body text-center">
                    Welcome back! Ready to continue saving money and reducing waste together?
                </StyledComponent>
            </StyledComponent>

            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <>
                        <StyledComponent
                            component={TextInput}
                            label="Username"
                            value={values.username}
                            placeholder="Enter your username"
                            onChangeText={handleChange('username')}
                            onBlur={handleBlur('username')}
                            className="my-1 mx-4 font-body bg-white border-2 border-primary"
                        />

                        <StyledComponent
                            component={TextInput}
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

                        <StyledComponent component={View} className="lg:mx-auto mt-2">
                            <StyledComponent
                                component={Button}
                                icon="account-circle"
                                mode="elevated"
                                className="max-w-md my-2 mx-auto bg-primary w-60"
                                textColor="white"
                                onPress={() => handleSubmit()}
                            >
                                Login
                            </StyledComponent>

                            <StyledComponent
                                component={Button}
                                icon="cancel"
                                mode="elevated"
                                className="max-w-md my-2 w-60 bg-secondary mx-auto"
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
