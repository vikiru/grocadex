import { NativeWindStyleSheet, StyledComponent } from 'nativewind';
import { Text, View } from 'react-native';

import { Button } from 'react-native-paper';

NativeWindStyleSheet.setOutput({
    default: 'native',
});

export default function Index() {
    return (
        <StyledComponent component={View} className="bg-green-400 min-h-[100%] min-w-[100%]">
            <StyledComponent component={View} className="flex-row mx-auto mt-10">
                <StyledComponent component={Text} className="text-white text-5xl font-bold">
                    Grocery
                </StyledComponent>
                <StyledComponent component={Text} className="text-black text-5xl font-bold">
                    Tracker
                </StyledComponent>
            </StyledComponent>
            <StyledComponent component={View} className="flex-row mx-auto mt-2">
                <StyledComponent component={Text} className="text-white text-xl italic">
                    A grocery expiry and expense tracker.
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="ml-6 mt-5 lg:mx-auto">
                <StyledComponent component={Text} className="text-black font-semibold text-left text-2xl">
                    Track Your Groceries
                </StyledComponent>
                <StyledComponent component={Text} className="text-white text-xl">
                    Never lose track of your grocery expiry dates again!
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="ml-6 mt-5 lg:mx-auto">
                <StyledComponent component={Text} className="text-black font-semibold text-left text-2xl">
                    Save Money
                </StyledComponent>
                <StyledComponent component={Text} className="text-white text-xl  max-w-sm">
                    Monitor your monthly expenses with ease and stay on-top of your budgeting goals!
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="ml-6 mt-5 lg:mx-auto">
                <StyledComponent component={Text} className="text-black font-semibold text-left text-2xl">
                    Reduce Waste
                </StyledComponent>
                <StyledComponent component={Text} className="text-white text-xl">
                    Keep your kitchen waste-free!
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className='mt-4'></StyledComponent>
            <StyledComponent
                component={Button}
                icon="account-plus"
                mode="elevated"
                className="max-w-md mt-4 mb-2 mx-4"
                textColor="black"
                onPress={() => console.log('Pressed')}
            >
                Sign Up
            </StyledComponent>
            <StyledComponent
                component={Button}
                icon="login"
                mode="elevated"
                className="max-w-md my-4 mx-4 bg-black text-red-600"
                textColor="white"
            >
                Login
            </StyledComponent>
        </StyledComponent>
    );
}
