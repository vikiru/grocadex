import * as Yup from 'yup';

import { ScrollView, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import { Formik } from 'formik';
import React from 'react';
import { useRegistration } from '~hooks/components';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
});

export default function RegisterScreen() {
    const { handleSignup, handleCancel } = useRegistration();

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSignup}
        >
            {({ handleChange, handleSubmit, handleBlur, values }) => (
                <ScrollView className="flex min-h-full min-w-full flex-1 bg-background pt-10">
                    <View className="mx-auto flex-row">
                        <Text className="font-heading text-3xl font-semibold text-text">
                            Sign Up
                        </Text>
                    </View>

                    <View className="my-2">
                        <Text className="text-center font-body text-lg text-gray-600">
                            Start your journey to saving money and reducing food
                            waste!
                        </Text>
                    </View>

                    <TextInput
                        className="mx-4 my-1 border-2 border-primary bg-white font-body"
                        label="First Name"
                        onBlur={handleBlur('firstName')}
                        onChangeText={handleChange('firstName')}
                        placeholder="Enter your first name"
                        value={values.firstName}
                    />

                    <TextInput
                        className="mx-4 my-1 border-2 border-primary bg-white font-body"
                        label="Last Name"
                        onBlur={handleBlur('lastName')}
                        onChangeText={handleChange('lastName')}
                        placeholder="Enter your last name"
                        value={values.lastName}
                    />

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
                        label="Email Address"
                        onBlur={handleBlur('email')}
                        onChangeText={handleChange('email')}
                        placeholder="Enter your email address"
                        value={values.email}
                    />

                    <TextInput
                        className="mx-4 my-1 border-2 border-primary bg-white font-body"
                        label="Password"
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        placeholder="Enter your password"
                        secureTextEntry
                        value={values.password}
                    />

                    <View className="lg:mx-auto">
                        <Button
                            className="mx-auto my-1 w-60 max-w-md bg-primary font-body"
                            icon="check-circle"
                            mode="elevated"
                            onPress={() => handleSubmit()}
                            textColor="white"
                        >
                            Confirm Details
                        </Button>

                        <Button
                            className="mx-auto my-1 w-60 max-w-md bg-secondary font-body"
                            icon="cancel"
                            mode="elevated"
                            onPress={() => handleCancel()}
                            textColor="white"
                        >
                            Cancel
                        </Button>
                    </View>
                </ScrollView>
            )}
        </Formik>
    );
}
