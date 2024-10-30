import * as Yup from 'yup';

import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import React from 'react';
import { useRegistration } from '~hooks/components/useRegistration';

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

export default function RegisterScreen() {
    const { handleSignup, handleCancel } = useRegistration();

    return (
        <Formik
            initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
        >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
                <StyledComponent
                    component={ScrollView}
                    className="bg-background min-h-full min-w-full flex pt-10 flex-1"
                >
                    <StyledComponent component={View} className="flex-row mx-auto">
                        <StyledComponent component={Text} className="text-text text-3xl font-semibold font-heading">
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
                        className="my-1 mx-4 font-body bg-white border-2 border-primary"
                    />

                    <StyledComponent
                        component={TextInput}
                        label="Last Name"
                        value={values.lastName}
                        placeholder="Enter your last name"
                        onChangeText={handleChange('lastName')}
                        onBlur={handleBlur('lastName')}
                        className="my-1 mx-4 font-body bg-white border-2 border-primary"
                    />

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
                        label="Email Address"
                        value={values.email}
                        placeholder="Enter your email address"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        className="my-1 mx-4 font-body bg-white border-2 border-primary"
                    />

                    <StyledComponent
                        component={TextInput}
                        label="Password"
                        value={values.password}
                        placeholder="Enter your password"
                        secureTextEntry
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        className="my-1 mx-4 font-body bg-white border-2 border-primary"
                    />

                    <StyledComponent component={View} className="lg:mx-auto">
                        <StyledComponent
                            component={Button}
                            icon="check-circle"
                            mode="elevated"
                            className="max-w-md my-1 mx-auto bg-primary font-body w-60"
                            textColor="white"
                            onPress={() => handleSubmit()}
                        >
                            Confirm Details
                        </StyledComponent>

                        <StyledComponent
                            component={Button}
                            icon="cancel"
                            mode="elevated"
                            className="max-w-md my-1 mx-auto bg-secondary font-body w-60"
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
