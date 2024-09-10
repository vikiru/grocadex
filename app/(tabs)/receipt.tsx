import { ScrollView, View } from 'react-native';

import { router } from 'expo-router';
import { StyledComponent } from 'nativewind';
import React from 'react';
import { FAB } from 'react-native-paper';
import SearchBar from '../../components/SearchBar/SearchBar';
import ReceiptCard from './../../components/ReceiptCard/ReceiptCard';

const testReceipts: any = [
    {
        id: 1,
        store: 'Walmart',
        purchaseDate: new Date('2023-08-15'),
        total: 100.5,
        groceryItems: [
            { name: 'Milk', quantity: 2, unitPrice: 3.5, totalPrice: 7 },
            { name: 'Bread', quantity: 1, unitPrice: 2.5, totalPrice: 2.5 },
        ],
    },
    {
        id: 2,
        store: 'Target',
        purchaseDate: new Date('2023-08-16'),
        total: 75.25,
        groceryItems: [
            { name: 'Eggs', quantity: 1, unitPrice: 4.25, totalPrice: 4.25 },
            { name: 'Cereal', quantity: 2, unitPrice: 3.5, totalPrice: 7 },
        ],
    },
    {
        id: 3,
        store: 'Costco',
        purchaseDate: new Date('2023-08-17'),
        total: 200.0,
        groceryItems: [
            { name: 'Bulk Rice', quantity: 1, unitPrice: 15, totalPrice: 15 },
            { name: 'Frozen Vegetables', quantity: 3, unitPrice: 10, totalPrice: 30 },
        ],
    },
    {
        id: 4,
        store: 'Whole Foods',
        purchaseDate: new Date('2023-08-18'),
        total: 150.75,
        groceryItems: [
            { name: 'Organic Apples', quantity: 5, unitPrice: 1.5, totalPrice: 7.5 },
            { name: 'Quinoa', quantity: 1, unitPrice: 6, totalPrice: 6 },
        ],
    },
    {
        id: 5,
        store: "Trader Joe's",
        purchaseDate: new Date('2023-08-19'),
        total: 80.3,
        groceryItems: [
            { name: 'Frozen Dumplings', quantity: 2, unitPrice: 4.5, totalPrice: 9 },
            { name: 'Dark Chocolate', quantity: 3, unitPrice: 2, totalPrice: 6 },
        ],
    },
    {
        id: 6,
        store: 'Safeway',
        purchaseDate: new Date('2023-08-20'),
        total: 95.6,
        groceryItems: [
            { name: 'Chicken', quantity: 2, unitPrice: 7, totalPrice: 14 },
            { name: 'Pasta', quantity: 3, unitPrice: 1.5, totalPrice: 4.5 },
        ],
    },
    {
        id: 7,
        store: 'Kroger',
        purchaseDate: new Date('2023-08-21'),
        total: 110.25,
        groceryItems: [
            { name: 'Ground Beef', quantity: 1, unitPrice: 8, totalPrice: 8 },
            { name: 'Potatoes', quantity: 5, unitPrice: 0.75, totalPrice: 3.75 },
        ],
    },
    {
        id: 8,
        store: 'Aldi',
        purchaseDate: new Date('2023-08-22'),
        total: 60.8,
        groceryItems: [
            { name: 'Canned Tomatoes', quantity: 4, unitPrice: 1, totalPrice: 4 },
            { name: 'Cheese', quantity: 2, unitPrice: 3, totalPrice: 6 },
        ],
    },
    {
        id: 9,
        store: 'Publix',
        purchaseDate: new Date('2023-08-23'),
        total: 88.45,
        groceryItems: [
            { name: 'Orange Juice', quantity: 1, unitPrice: 4, totalPrice: 4 },
            { name: 'Yogurt', quantity: 4, unitPrice: 1.25, totalPrice: 5 },
        ],
    },
    {
        id: 10,
        store: 'Meijer',
        purchaseDate: new Date('2023-08-24'),
        total: 130.15,
        groceryItems: [
            { name: 'Fresh Fruit', quantity: 3, unitPrice: 3, totalPrice: 9 },
            { name: 'Deli Meat', quantity: 2, unitPrice: 5, totalPrice: 10 },
        ],
    },
];
export default function receipt() {
    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search receipts..." />
            <StyledComponent component={View} className="grid grid-cols-3">
                {testReceipts.map((receipt) => (
                    <StyledComponent component={ReceiptCard} receipt={receipt} key={receipt.id} />
                ))}
            </StyledComponent>
            <StyledComponent
                component={FAB}
                icon="plus"
                onPress={() => {
                    router.push('/receipt/new');
                }}
                className="absolute bottom-10 right-10 z-0 bg-white"
            />
        </StyledComponent>
    );
}
