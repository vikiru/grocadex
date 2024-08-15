import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

import Logo from '@/components/Logo';
import { StyledComponent } from 'nativewind';
import { useState } from 'react';

export default function Login() {
    const [userDetails, setUserDetails] = useState('');
    const [password, setPassword] = useState('');

    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex">
            <Logo />
            <StyledComponent component={View} className="flex-row mx-auto my-2">
                <StyledComponent component={Text} className="text-text text-lg italic font-body text-center">
                    Welcome back! Ready to continue saving money and reducing waste together?
                </StyledComponent>
            </StyledComponent>

            <StyledComponent
                component={TextInput}
                label="Username or Email"
                value={userDetails}
                placeholder="Enter your username or email"
                onChangeText={(text) => setUserDetails(text)}
                className="my-2 mx-4"
            />

            <StyledComponent
                component={TextInput}
                label="Password"
                value={password}
                secureTextEntry
                placeholder="Enter your password"
                onChangeText={(text) => setPassword(text)}
                className="my-2 mx-4"
            />

            <StyledComponent component={View} className="lg:mx-auto">
                <StyledComponent
                    component={Button}
                    icon="account-circle"
                    mode="elevated"
                    className="max-w-md lg:max-w-full my-2 mx-4 bg-primary"
                    textColor="black"
                    onPress={() => console.log('Pressed')}
                >
                    Login
                </StyledComponent>

                <StyledComponent
                    component={Button}
                    icon="cancel"
                    mode="elevated"
                    className="max-w-md my-2 mx-4 bg-secondary"
                    textColor="white"
                >
                    Cancel
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
