import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import { Divider } from 'react-native-paper';
import ExpenseDisplay from '~components/ExpenseDisplay/ExpenseDisplay';
import GroceryCard from '~components/GroceryCard/GroceryCard';
import ReceiptTable from '~components/ReceiptTable/ReceiptTable';
import { useDashboard } from '~hooks/components/useDashboard';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useExpense } from '~hooks/redux/useExpense';
import { useReceipt } from '~hooks/redux/useReceipt';

export default function Dashboard() {
    const { handleDataRetrieval } = useDashboard();
    const { monthlyTotal } = useExpense();
    const { receipts } = useReceipt();
    const { activeItems } = useActiveItem();

    useEffect(() => {
        handleDataRetrieval();
    }, []);

    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full flex">
            <StyledComponent component={View} className="bg-background">
                <StyledComponent
                    component={ScrollView}
                    className="flex flex-row space-x-2 m-2 pb-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {activeItems.slice(0, 5).map((item, index) => (
                        <StyledComponent component={GroceryCard} item={item} key={index} />
                    ))}
                </StyledComponent>

                <Divider />
                <ExpenseDisplay monthlyExpense={monthlyTotal} />

                <StyledComponent
                    component={View}
                    className="bg-background m-2 rounded-lg shadow-md border-2 border-primary"
                >
                    <ReceiptTable receipts={receipts} />
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
