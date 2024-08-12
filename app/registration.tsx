import * as React from 'react';

import { Button, TextInput } from 'react-native-paper';
import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { Text, View } from 'react-native';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

export default function Index() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userName, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex">
            <StyledComponent component={View} className="flex-row mx-auto mt-5">
                <StyledComponent component={Text} className="text-text text-4xl font-semibold font-heading">
                    Sign Up
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="my-2">
                <StyledComponent component={Text} className="text-center text-text text-lg font-body">
                    Start your journey to saving money and reducing food waste!
                </StyledComponent>
            </StyledComponent>

            <StyledComponent
                component={TextInput}
                label="First Name"
                value={firstName}
                placeholder="Enter your first name"
                onChangeText={(text) => setFirstName(text)}
                className="my-2 mx-4"
            />

            <StyledComponent
                component={TextInput}
                label="Last Name"
                value={lastName}
                placeholder="Enter your last name"
                onChangeText={(text) => setLastName(text)}
                className="my-2 mx-4"
            />

            <StyledComponent
                component={TextInput}
                label="Username"
                value={userName}
                placeholder="Enter your username"
                onChangeText={(text) => setUsername(text)}
                className="my-2 mx-4"
            />

            <StyledComponent
                component={TextInput}
                label="Email Address"
                value={email}
                placeholder="Enter your email address"
                onChangeText={(text) => setEmail(text)}
                className="my-2 mx-4"
            />

            <StyledComponent
                component={TextInput}
                label="Password"
                value={password}
                placeholder="Enter your password"
                onChangeText={(text) => setPassword(text)}
                className="my-2 mx-4"
            />

            <StyledComponent component={View} className="lg:mx-auto">
                <StyledComponent
                    component={Button}
                    icon="check-circle"
                    mode="elevated"
                    className="max-w-md lg:max-w-full my-2 mx-4 bg-primary"
                    textColor="black"
                    onPress={() => console.log('Pressed')}
                >
                    Confirm Details
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
