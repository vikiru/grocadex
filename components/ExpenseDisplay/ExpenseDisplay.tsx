import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';

interface ExpenseDisplayProps {
    monthlyExpense: number;
}

export default function ExpenseDisplay({ monthlyExpense }: ExpenseDisplayProps) {
    return (
        <StyledComponent
            component={View}
            className="border-primary border-2 mx-auto rounded-lg mt-2 p-4 w-44 shadow-md bg-background"
        >
            <StyledComponent component={View} className="flex-row items-center justify-center">
                <StyledComponent component={Text} className="text-text text-xl lg:text-2xl font-semibold font-heading">
                    $ {monthlyExpense.toLocaleString()}
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
