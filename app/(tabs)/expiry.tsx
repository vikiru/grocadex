import { ScrollView, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';
import GroceryItemCard from '../../components/GroceryItemCard/GroceryItemCard';
import SearchBar from './../../components/SearchBar/SearchBar';

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

export default function expiry() {
    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search items..." />
            <StyledComponent component={View} className="grid grid-cols-3">
                {testData.map((item) => (
                    <StyledComponent component={GroceryItemCard} item={item} key={item.id} />
                ))}
            </StyledComponent>
        </StyledComponent>
    );
}
