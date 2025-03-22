import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import DateInputField from '~components/DateInputField';
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
    const [purchaseDate, setPurchaseDate] = useState(new Date());

    return (
        <VStack className="min-h-screen w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Receipt
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Store Name
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter store name"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <DateInputField
                date={purchaseDate}
                label="Purchase Date"
                setDate={setPurchaseDate}
            />

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Total ($)
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter total amount spent"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-2 flex items-center justify-between">
                <Heading className="font-heading font-semibold xs:text-2xl xl:text-3xl">
                    Grocery Items
                </Heading>
                <Text className="mt-2 font-body text-lg text-typography-600">
                    Add Item
                </Text>
            </HStack>

            <ScrollView className="mx-4 mt-4 max-h-[14rem] xl:mt-2 xl:max-h-[20rem]">
                {groceryItems.map((groceryItem, index) => (
                    <VStack className="gap-3 pb-6" key={index}>
                        <HStack className="flex items-center justify-between">
                            <Heading className="mt-2 font-heading font-medium">
                                {groceryItem.name} ({groceryItem.quantity})
                            </Heading>
                            <Text className="mt-2 font-info">
                                ${groceryItem.price}
                            </Text>
                        </HStack>

                        <HStack>
                            <Text className="font-info">
                                Expires on {groceryItem.expiryDate}.
                            </Text>
                        </HStack>
                        <HStack className="flex items-center gap-2">
                            <Button
                                action="primary"
                                className="w-28"
                                size="md"
                                variant="solid"
                            >
                                <MaterialCommunityIcons
                                    className="mb-1 ml-2"
                                    color="white"
                                    name="pencil"
                                    size={24}
                                />
                            </Button>
                            <Button
                                action="negative"
                                className="w-28"
                                size="md"
                                variant="solid"
                            >
                                <MaterialCommunityIcons
                                    className="mb-1 ml-2"
                                    color="white"
                                    name="trash-can"
                                    size={24}
                                />
                            </Button>
                        </HStack>
                    </VStack>
                ))}
            </ScrollView>
        </VStack>
    );
}

export default CreateReceipt;
