import React, { useEffect, useState } from 'react';

import { View } from 'react-native';
import BarChart from '~components/BarChart/BarChart';
import ExpenseTable from '~components/ExpenseTable/ExpenseTable';
import { useExpense } from '~hooks/redux/useExpense';
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
            {yearlyExpenses.length > 0 && <ExpenseTable data={yearlyExpenses} />}
        </View>
    );
}
