import { ScrollView } from 'react-native';
import GroceryCard from '~components/GroceryCard';
import { Button, ButtonText } from '~components/ui/button';
import { Card } from '~components/ui/card';
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

const expenses = [
    { store: 'Walmart', purchased: '03/15/2023', total: 219.5 },
    {
        store: 'Real Canadian Superstore',
        purchased: '03/10/2023',
        total: 159.99,
    },
    { store: 'Shoppers Drug Mart', purchased: '03/05/2023', total: 185.3 },
    { store: 'Metro', purchased: '02/28/2023', total: 210.6 },
    { store: 'Costco', purchased: '02/20/2023', total: 275.9 },
    { store: 'Food Basics', purchased: '02/12/2023', total: 125.99 },
    { store: 'Loblaws', purchased: '02/05/2023', total: 189.3 },
    { store: 'FreshCo', purchased: '01/28/2023', total: 250.0 },
    { store: 'Provigo', purchased: '01/22/2023', total: 175.45 },
    { store: 'Safeway', purchased: '01/15/2023', total: 132.0 },
];

function Dashboard() {
    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mb-4 mt-2 flex items-center justify-between">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Current Grocery Items
                </Heading>
                <Button variant="link">
                    <ButtonText className="text-lg xl:text-xl">
                        Show All
                    </ButtonText>
                </Button>
            </HStack>

            <ScrollView className="mx-4 max-h-[200px]" horizontal>
                <HStack className="gap-4">
                    <GroceryCard />
                    <GroceryCard />
                    <GroceryCard />
                    <GroceryCard />
                </HStack>
            </ScrollView>

            <HStack className="mx-4 mt-4">
                <Heading className="font-semibold xs:text-2xl xl:text-3xl">
                    Monthly Expenses
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-4">
                <Card className="w-full max-w-lg rounded-xl bg-background-200/50 p-6 shadow-sm">
                    <Text className="mb-2 font-heading text-xl text-typography-600">
                        Your Expenses
                    </Text>
                    <Heading className="text-primary mb-2 font-info font-bold text-typography-950 xs:text-3xl xl:text-4xl">
                        $2137.09
                    </Heading>
                    <Text className="font-body text-xl text-error-500">
                        40% increase from last month
                    </Text>
                </Card>
            </HStack>

            <VStack className="mx-4 mb-6 mt-4 bg-background-100 shadow-sm">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-background-200/50">
                            <TableHead className="font-heading text-xl">
                                Store
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Purchased
                            </TableHead>
                            <TableHead className="font-heading text-xl">
                                Total
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map((expense, index) => (
                            <TableRow key={index}>
                                <TableData className="font-body xl:text-lg">
                                    {expense.store}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    {expense.purchased}
                                </TableData>
                                <TableData className="font-info xl:text-lg">
                                    {expense.total.toFixed(2)}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </VStack>
        </ScrollView>
    );
}

export default Dashboard;
