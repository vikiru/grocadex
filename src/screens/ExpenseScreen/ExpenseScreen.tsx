import React, { useEffect, useState } from 'react';

import { StyledComponent } from 'nativewind';
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
        <StyledComponent component={View} className="bg-background">
            <BarChart data={data} />
            <ExpenseTable data={yearlyExpenses} />
        </StyledComponent>
    );
}
