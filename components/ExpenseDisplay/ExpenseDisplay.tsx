import { Card, Text } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { View } from 'react-native';

interface ExpenseDisplayProps {
    monthlyExpense: number;
}

export default function ExpenseDisplay({ monthlyExpense }: ExpenseDisplayProps) {
    return (
        <StyledComponent component={Card} className="mx-auto mt-4 w-64 bg-gray-300 shadow-sm">
            <Card.Content>
                <StyledComponent component={View} className="flex-row items-center justify-center">
                    <StyledComponent component={Text} className="text-gray-600 text-lg font-semibold">
                        Monthly Expense
                    </StyledComponent>
                </StyledComponent>
                <StyledComponent component={View} className="flex-row items-center justify-center mt-2">
                    <StyledComponent component={Text} className="text-white text-3xl font-bold">
                        ${monthlyExpense.toLocaleString()}
                    </StyledComponent>
                </StyledComponent>
            </Card.Content>
        </StyledComponent>
    );
}
