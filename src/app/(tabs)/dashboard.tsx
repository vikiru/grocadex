import { ScrollView, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { Divider } from 'react-native-paper';
import ExpenseDisplay from '~components/ExpenseDisplay/ExpenseDisplay';
import GroceryCard from '~components/GroceryCard/GroceryCard';
import ReceiptTable from '~components/ReceiptTable/ReceiptTable';

const testData = [
    {
        id: 1,
        name: 'Apples',
        quantity: 4,
        unitPrice: 2.99,
        totalPrice: 11.96,
        purchaseDate: new Date('2023-05-01'),
        expiryDate: new Date('2023-05-06'),
    },
    {
        id: 2,
        name: 'Bananas',
        quantity: 6,
        unitPrice: 1.29,
        totalPrice: 7.74,
        purchaseDate: new Date('2023-05-02'),
        expiryDate: new Date('2023-05-12'),
    },
    {
        id: 3,
        name: 'Milk',
        quantity: 1,
        unitPrice: 3.49,
        totalPrice: 3.49,
        purchaseDate: new Date('2023-05-03'),
        expiryDate: new Date('2023-05-06'),
    },
    {
        id: 4,
        name: 'Bread',
        quantity: 2,
        unitPrice: 2.49,
        totalPrice: 4.98,
        purchaseDate: new Date('2023-05-01'),
        expiryDate: new Date('2023-05-08'),
    },
    {
        id: 5,
        name: 'Cheese',
        quantity: 1,
        unitPrice: 4.99,
        totalPrice: 4.99,
        purchaseDate: new Date('2023-05-02'),
        expiryDate: new Date('2023-05-17'),
    },
    {
        id: 6,
        name: 'Chicken',
        quantity: 2,
        unitPrice: 5.99,
        totalPrice: 11.98,
        purchaseDate: new Date('2023-05-03'),
        expiryDate: new Date('2023-05-07'),
    },
    {
        id: 7,
        name: 'Eggs',
        quantity: 1,
        unitPrice: 3.99,
        totalPrice: 3.99,
        purchaseDate: new Date('2023-05-04'),
        expiryDate: new Date('2023-05-18'),
    },
    {
        id: 8,
        name: 'Yogurt',
        quantity: 3,
        unitPrice: 1.49,
        totalPrice: 4.47,
        purchaseDate: new Date('2023-05-02'),
        expiryDate: new Date('2023-05-16'),
    },
    {
        id: 9,
        name: 'Tomatoes',
        quantity: 5,
        unitPrice: 0.79,
        totalPrice: 3.95,
        purchaseDate: new Date('2023-05-05'),
        expiryDate: new Date('2023-05-12'),
    },
    {
        id: 10,
        name: 'Pasta',
        quantity: 2,
        unitPrice: 1.99,
        totalPrice: 3.98,
        purchaseDate: new Date('2023-05-01'),
        expiryDate: new Date('2023-12-31'),
    },
];

const testReceipts = [
    {
        id: 1,
        store: 'Walmart',
        purchaseDate: new Date('2023-08-15'),
        total: 100.5,
    },
    {
        id: 2,
        store: 'Target',
        purchaseDate: new Date('2023-08-16'),
        total: 75.25,
    },
    {
        id: 3,
        store: 'Costco',
        purchaseDate: new Date('2023-08-17'),
        total: 200.0,
    },
    {
        id: 4,
        store: 'Whole Foods',
        purchaseDate: new Date('2023-08-18'),
        total: 150.75,
    },
    {
        id: 5,
        store: "Trader Joe's",
        purchaseDate: new Date('2023-08-19'),
        total: 80.3,
    },
    {
        id: 6,
        store: 'Safeway',
        purchaseDate: new Date('2023-08-20'),
        total: 95.6,
    },
    {
        id: 7,
        store: 'Kroger',
        purchaseDate: new Date('2023-08-21'),
        total: 110.25,
    },
    {
        id: 8,
        store: 'Aldi',
        purchaseDate: new Date('2023-08-22'),
        total: 60.8,
    },
    {
        id: 9,
        store: 'Publix',
        purchaseDate: new Date('2023-08-23'),
        total: 88.45,
    },
    {
        id: 10,
        store: 'Meijer',
        purchaseDate: new Date('2023-08-24'),
        total: 130.15,
    },
];

export default function Dashboard() {
    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full flex">
            <StyledComponent component={View} className="bg-background">
                <StyledComponent
                    component={ScrollView}
                    className="flex flex-row space-x-2 m-2 pb-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {testData.map((item, index) => (
                        <StyledComponent component={GroceryCard} item={item} key={index} />
                    ))}
                </StyledComponent>

                <Divider />
                <ExpenseDisplay monthlyExpense={testReceipts.reduce((total, receipt) => total + receipt.total, 0)} />

                <StyledComponent
                    component={View}
                    className="bg-background m-2 rounded-lg shadow-md border-2 border-primary"
                >
                    <ReceiptTable receipts={testReceipts} />
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
