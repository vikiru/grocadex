import { Text } from 'react-native-paper';

import React from 'react';
import { View } from 'react-native';

type ExpenseDisplayProps = {
    monthlyExpense: number;
};

export default function ExpenseDisplay({
    monthlyExpense,
}: ExpenseDisplayProps) {
    return (
        <View className="mx-auto w-64 bg-background shadow-none">
            <View className="flex-row items-center justify-center">
                <Text className="text-lg font-semibold uppercase text-gray-600">
                    Monthly Expenses
                </Text>
            </View>
            <View className="mt-2 flex-row items-center justify-center">
                <Text className="text-3xl font-bold text-text">
                    ${monthlyExpense.toFixed(2)}
                </Text>
            </View>
        </View>
    );
}
