import { Card, Text } from 'react-native-paper';

import React from 'react';
import { View } from 'react-native';

type ExpenseDisplayProps = {
    monthlyExpense: number;
};

export default function ExpenseDisplay({ monthlyExpense }: ExpenseDisplayProps) {
    return (
        <Card className="mx-auto w-64 bg-background shadow-none">
            <Card.Content>
                <View className="flex-row items-center justify-center">
                    <Text className="text-gray-600 text-lg uppercase font-semibold">Monthly Expenses</Text>
                </View>
                <View className="flex-row items-center justify-center mt-2">
                    <Text className="text-text text-3xl font-bold">${monthlyExpense.toFixed(2)}</Text>
                </View>
            </Card.Content>
        </Card>
    );
}
