import { ScrollView, Text, View } from 'react-native';
import { Button, Divider } from 'react-native-paper';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { GroceryItem } from '../../types/GroceryItem';
import { Receipt } from '../../types/Receipt';

// TODO: add view receipt page
// TODO: add view/delete grocery and receipt functionality
// TODO: fix styling (fonts, colorurs, etc)
// TODO: connect frontend to backend
// TODO: add aws, update readme, add docs, add logo and favicons, openapi docs
// TODO: cleanup dependencies, configs, fonts, add sample env, add comments
// TODO: redo receipt form from items, grocery modal, add date modal/picker component, add submit handling
// TODO: update grocery cards to be universal/consistent or max 2 components for this purpose. add view receipt functionality,
// search items

export default function ReceiptView({ receipt }: { receipt: Receipt | Partial<Receipt> }) {
    console.log(receipt);
    const testReceipt: Partial<Receipt> = {
        id: 1,
        store: 'Walmart',
        purchaseDate: new Date('2023-08-15'),
        total: 100.5,
        groceryItems: [
            {
                id: 1,
                userId: 1,
                name: 'Milk',
                quantity: 2,
                unitPrice: 3.5,
                totalPrice: 7,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 2,
                userId: 1,
                name: 'Bread',
                quantity: 1,
                unitPrice: 2.5,
                totalPrice: 2.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-08-15'),
            },
            {
                id: 3,
                userId: 1,
                name: 'Eggs',
                quantity: 1,
                unitPrice: 1.5,
                totalPrice: 1.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 4,
                userId: 1,
                name: 'Chicken',
                quantity: 2,
                unitPrice: 7,
                totalPrice: 14,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 5,
                userId: 1,
                name: 'Pasta',
                quantity: 3,
                unitPrice: 1.5,
                totalPrice: 4.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 6,
                userId: 1,
                name: 'Ground Beef',
                quantity: 1,
                unitPrice: 8,
                totalPrice: 8,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 7,
                userId: 1,
                name: 'Potatoes',
                quantity: 5,
                unitPrice: 0.75,
                totalPrice: 3.75,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 8,
                userId: 1,
                name: 'Canned Tomatoes',
                quantity: 4,
                unitPrice: 1,
                totalPrice: 4,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 9,
                userId: 1,
                name: 'Cheese',
                quantity: 2,
                unitPrice: 3,
                totalPrice: 6,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 10,
                userId: 1,
                name: 'Orange Juice',
                quantity: 1,
                unitPrice: 4,
                totalPrice: 4,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 11,
                userId: 1,
                name: 'Yogurt',
                quantity: 4,
                unitPrice: 1.25,
                totalPrice: 5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 12,
                userId: 1,
                name: 'Fresh Fruit',
                quantity: 3,
                unitPrice: 3,
                totalPrice: 9,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 13,
                userId: 1,
                name: 'Deli Meat',
                quantity: 2,
                unitPrice: 5,
                totalPrice: 10,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 14,
                userId: 1,
                name: 'Baking Supplies',
                quantity: 1,
                unitPrice: 2,
                totalPrice: 2,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 15,
                userId: 1,
                name: 'Pantry Items',
                quantity: 4,
                unitPrice: 1.5,
                totalPrice: 6,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 16,
                userId: 1,
                name: 'Snacks',
                quantity: 2,
                unitPrice: 2.5,
                totalPrice: 5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 17,
                userId: 1,
                name: 'Beverages',
                quantity: 3,
                unitPrice: 1.75,
                totalPrice: 5.25,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 18,
                userId: 1,
                name: 'Dairy Products',
                quantity: 1,
                unitPrice: 4.5,
                totalPrice: 4.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 19,
                userId: 1,
                name: 'Meat',
                quantity: 1,
                unitPrice: 8.5,
                totalPrice: 8.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 20,
                userId: 1,
                name: 'Produce',
                quantity: 2,
                unitPrice: 2.25,
                totalPrice: 4.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 21,
                userId: 1,
                name: 'Poultry',
                quantity: 1,
                unitPrice: 6.5,
                totalPrice: 6.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
            {
                id: 22,
                userId: 1,
                name: 'Seafood',
                quantity: 1,
                unitPrice: 7.5,
                totalPrice: 7.5,
                receiptId: 1,
                purchaseDate: new Date('2023-08-15'),
                expiryDate: new Date('2023-09-15'),
            },
        ],
    };

    return (
        <StyledComponent component={View} className="bg-background min-h-screen min-w-screen">
            <StyledComponent component={View} className="flex flex-row justify-between m-2">
                <StyledComponent component={Text} className="text-xl font-heading flex-1">
                    {testReceipt.store}
                </StyledComponent>
                <StyledComponent component={Text} className="font-heading font-light text-lg">
                    Aug 23, 2023
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="mx-2 mt-2 flex flex-row justify-between">
                <StyledComponent component={Text} className="text-2xl font-semibold mb-1">
                    CAD${testReceipt.total?.toFixed(2)}
                </StyledComponent>
                <StyledComponent component={Text} className="text-lg font-subheading">
                    {testReceipt.groceryItems?.length} items
                </StyledComponent>
            </StyledComponent>

            <Divider />

            <StyledComponent component={ScrollView} className="mx-2 max-h-64 pb-2">
                {testReceipt.groceryItems?.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                    <StyledComponent component={View} key={item.id} className="mx-2 mt-1 flex flex-row justify-between">
                        <StyledComponent component={Text} className="font-body text-base">
                            {index + 1}. {item.name} ({item.quantity})
                        </StyledComponent>
                        <StyledComponent component={Text} className="font-subheading text-base">
                            ${item.totalPrice?.toFixed(2)}
                        </StyledComponent>
                        <Divider />
                    </StyledComponent>
                ))}
            </StyledComponent>

            <StyledComponent component={View} className="mt-6 flex-1 flex">
                <StyledComponent
                    component={Button}
                    icon="pencil"
                    mode="elevated"
                    className="max-w-md bg-primary w-60 mx-auto h-10 mt-2"
                    textColor="white"
                >
                    Edit
                </StyledComponent>

                <StyledComponent
                    component={Button}
                    icon="cancel"
                    mode="elevated"
                    className="max-w-md w-60 mx-auto h-10 mt-4 shadow-md bg-red-400"
                    textColor="white"
                >
                    Delete
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
