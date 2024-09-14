import { StyledComponent } from 'nativewind';
import React from 'react';
import { ScrollView } from 'react-native';
import ExpenseTable from '~components/ExpenseTable/ExpenseTable';

const data = [
    { month: 'Jan', value: 100 },
    { month: 'Feb', value: 200 },
    { month: 'Mar', value: 300 },
    { month: 'Apr', value: 400 },
    { month: 'May', value: 500 },
    { month: 'Jun', value: 600 },
    { month: 'Jul', value: 700 },
    { month: 'Aug', value: 800 },
    { month: 'Sep', value: 900 },
    { month: 'Oct', value: 1000 },
    { month: 'Nov', value: 1100 },
    { month: 'Dec', value: 1200 },
];

export default function Expenses() {
    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full">
            <ExpenseTable data={data} />
        </StyledComponent>
    );
}
