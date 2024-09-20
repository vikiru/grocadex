import { Card, Text } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

type ExpenseDisplayProps = {
    monthlyExpense: number;
};

export default function ExpenseDisplay({ monthlyExpense }: ExpenseDisplayProps) {
    return (
        <StyledComponent component={Card} className="mx-auto w-64 bg-background shadow-none">
            <Card.Content>
                <StyledComponent component={View} className="flex-row items-center justify-center">
                    <StyledComponent component={Text} className="text-gray-600 text-lg uppercase font-semibold">
                        Monthly Expenses
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={View} className="flex-row items-center justify-center mt-2">
                    <StyledComponent component={Text} className="text-text text-3xl font-bold">
                        ${monthlyExpense.toFixed(2)}
                    </StyledComponent>
                </StyledComponent>
            </Card.Content>
        </StyledComponent>
    );
}
