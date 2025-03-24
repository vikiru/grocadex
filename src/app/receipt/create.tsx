import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';
import DateInputField from '~components/DateInputField';
import ReceiptForm from '~components/forms/ReceiptForm';
import { Button } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
const groceryItems = [
    {
        name: 'Apple',
        price: 200,
        quantity: 3,
        purchasedDate: '01/01/2023',
        expiryDate: '01/06/2023',
    },
    {
        name: 'Banana',
        price: 120,
        quantity: 6,
        purchasedDate: '03/15/2025',
        expiryDate: '03/25/2025',
    },
    {
        name: 'Carrot',
        price: 80,
        quantity: 5,
        purchasedDate: '02/10/2025',
        expiryDate: '02/20/2025',
    },
    {
        name: 'Tomato',
        price: 150,
        quantity: 2,
        purchasedDate: '01/20/2025',
        expiryDate: '01/30/2025',
    },
    {
        name: 'Broccoli',
        price: 180,
        quantity: 1,
        purchasedDate: '03/01/2025',
        expiryDate: '03/11/2025',
    },
    {
        name: 'Milk',
        price: 220,
        quantity: 1,
        purchasedDate: '02/25/2025',
        expiryDate: '03/07/2025',
    },
    {
        name: 'Cheese',
        price: 350,
        quantity: 2,
        purchasedDate: '03/05/2025',
        expiryDate: '03/15/2025',
    },
    {
        name: 'Chicken',
        price: 500,
        quantity: 1,
        purchasedDate: '03/15/2025',
        expiryDate: '03/20/2025',
    },
    {
        name: 'Eggs',
        price: 200,
        quantity: 12,
        purchasedDate: '03/10/2025',
        expiryDate: '03/20/2025',
    },
    {
        name: 'Spinach',
        price: 100,
        quantity: 1,
        purchasedDate: '03/18/2025',
        expiryDate: '03/28/2025',
    },
];

function CreateReceipt() {
    return (
        <VStack className="min-h-screen w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Receipt
                </Heading>
            </HStack>

            <ReceiptForm />
        </VStack>
    );
}

export default CreateReceipt;
