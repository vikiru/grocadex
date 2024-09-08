import * as Yup from 'yup';

import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { Text, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';

import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import usePostData from '../hooks/usePostData';
import { RequestPayload } from '../types/RequestPayload';
import { User } from '../types/User';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export default function SignUp() {
    const { postData } = usePostData();

    const handleSignUp = async (values: User) => {
        const payload: RequestPayload = {
            url: `${process.env.API_URL}/users`,
            data: values,
        };
        const data = await postData(payload);
        if (data?.status === 201) {
            router.push('/');
        }
    };

    const handleCancel = async () => {
        router.push('/');
    };

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignUp}
        >
            {({ handleChange, handleSubmit, handleBlur, values, errors, touched }) => (
                <StyledComponent component={View} className="bg-background min-h-full min-w-full flex mt-10">
                    <StyledComponent component={View} className="flex-row mx-auto mt-5">
                        <StyledComponent component={Text} className="text-text text-4xl font-semibold font-heading">
                            Sign Up
                        </StyledComponent>
                    </StyledComponent>

                    <StyledComponent component={View} className="my-2">
                        <StyledComponent component={Text} className="text-center text-gray-600 text-lg font-body">
                            Start your journey to saving money and reducing food waste!
                        </StyledComponent>
                    </StyledComponent>

                    <StyledComponent
                        component={TextInput}
                        label="First Name"
                        value={values.firstName}
                        placeholder="Enter your first name"
                        onChangeText={handleChange('firstName')}
                        onBlur={handleBlur('firstName')}
                        className="my-2 mx-4 font-body bg-white border-2 border-primary"
                    />
                    <HelperText type="error" visible={touched.firstName && !!errors.firstName}>
                        {errors.firstName}
                    </HelperText>

                    <StyledComponent
                        component={TextInput}
                        label="Last Name"
                        value={values.lastName}
                        placeholder="Enter your last name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        className="my-2 mx-4 font-body bg-white border-2 border-primary"
                    />
                    <HelperText type="error" visible={touched.lastName && !!errors.lastName}>
                        {errors.lastName}
                    </HelperText>

                    <StyledComponent
                        component={TextInput}
                        label="Username"
                        value={values.username}
                        placeholder="Enter your username"
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        className="my-2 mx-4 font-body bg-white border-2 border-primary"
                    />
                    <HelperText type="error" visible={touched.username && !!errors.username}>
                        {errors.username}
                    </HelperText>

                    <StyledComponent
                        component={TextInput}
                        label="Email Address"
                        value={values.email}
                        placeholder="Enter your email address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        className="my-2 mx-4 font-body bg-white border-2 border-primary"
                    />
                    <HelperText type="error" visible={touched.email && !!errors.email}>
                        {errors.email}
                    </HelperText>

                    <StyledComponent
                        component={TextInput}
                        label="Password"
                        value={values.password}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        className="my-2 mx-4 font-body bg-white border-2 border-primary"
                    />
                    <HelperText type="error" visible={touched.password && !!errors.password}>
                        {errors.password}
                    </HelperText>

                    <StyledComponent component={View} className="lg:mx-auto">
                        <StyledComponent
                            component={Button}
                            icon="check-circle"
                            mode="elevated"
                            className="max-w-md my-2 mx-auto bg-primary font-body w-96"
                            textColor="white"
                            onPress={() => handleSubmit()}
                        >
                            Confirm Details
                        </StyledComponent>

                        <StyledComponent
                            component={Button}
                            icon="cancel"
                            mode="elevated"
                            className="max-w-md my-2 mx-auto bg-secondary font-body w-96"
                            textColor="white"
                            onPress={() => handleCancel()}
                        >
                            Cancel
                        </StyledComponent>
                    </StyledComponent>
                </StyledComponent>
            )}
        </Formik>
    );
}
