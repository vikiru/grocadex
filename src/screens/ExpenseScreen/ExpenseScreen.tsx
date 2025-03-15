import React, { useEffect, useState } from 'react';
import { BarChart, ExpenseTable } from '~components/index';

import { View } from 'react-native';
import { useExpense } from '~hooks/redux';
import { constructGraphData } from '~utils/expense';

export default function ExpenseScreen() {
    const { yearlyExpenses } = useExpense();
    const [data, setData] = useState<{ label: string; amount: number }[]>([]);

    useEffect(() => {
        if (yearlyExpenses) {
            const graphData = constructGraphData(yearlyExpenses);
            setData(graphData);
        }
    }, [yearlyExpenses]);

    return (
        <View className="bg-background">
            <BarChart data={data} />
            {yearlyExpenses.length > 0 && (
                <ExpenseTable data={yearlyExpenses} />
            )}
        </View>
    );
}
