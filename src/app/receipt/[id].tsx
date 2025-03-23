import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import {
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
} from '~components/ui/table';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

const groceryItems = [
    { name: 'Apple', quantity: 3, totalPrice: 5.25 },
    { name: 'Banana', quantity: 6, totalPrice: 3.0 },
    { name: 'Orange', quantity: 2, totalPrice: 4.0 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
    { name: 'Milk', quantity: 1, totalPrice: 1.5 },
    { name: 'Eggs', quantity: 12, totalPrice: 2.5 },
];

function ReceiptDetails() {
    const totalSpent = groceryItems
        .reduce((acc, item) => acc + item.totalPrice, 0)
        .toFixed(2);

    return (
        <VStack className="bg-background-100">
            <HStack className="mx-4 mt-2 flex items-center justify-between">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Costco
                </Heading>
                <Heading className="font-info font-medium xs:text-2xl xl:text-3xl">
                    ${totalSpent}
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-1">
                <Text className="font-body text-lg text-typography-600 xl:text-xl">
                    40 items purchased on 01/01/2023.
                </Text>
            </HStack>

            <ScrollView className="mx-4 mb-6 mt-4 max-h-[20rem] bg-background-100 shadow-sm xl:mt-2 xl:max-h-[28rem]">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-background-200/50">
                            <TableHead className="font-heading text-xl">
                                Item
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Quantity
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Total
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {groceryItems.map((item, index) => (
                            <TableRow key={index}>
                                <TableData className="font-body xl:text-lg">
                                    {item.name}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    {item.quantity}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    ${item.totalPrice.toFixed(2)}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollView>

            <HStack className="mx-4 mt-2">
                <Button
                    action="primary"
                    className="flex-1"
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">Edit</ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1 ml-2"
                        color="white"
                        name="pencil"
                        size={24}
                    />
                </Button>
            </HStack>

            <HStack className="mx-4 mt-2">
                <Button
                    action="negative"
                    className="flex-1"
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">
                        Delete
                    </ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1 ml-2"
                        color="white"
                        name="trash-can"
                        size={24}
                    />
                </Button>
            </HStack>
        </VStack>
    );
}

export default ReceiptDetails;
