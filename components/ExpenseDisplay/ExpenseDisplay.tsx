import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';

interface ExpenseDisplayProps {
    monthlyExpense: number;
}

export default function ExpenseDisplay({ monthlyExpense }: ExpenseDisplayProps) {
    return (
        <StyledComponent component={View} className="border-primary border-2 mx-auto rounded-xl mt-2 p-4 w-44">
            <StyledComponent component={View} className="flex-row items-center justify-center">
                <StyledComponent component={Text} className="text-text text-lg lg:text-2xl font-semibold">
                    $ {monthlyExpense.toLocaleString()}
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
