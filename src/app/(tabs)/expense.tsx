import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native';
import { Platform } from 'react-native';
import {
    Heading,
    HStack,
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    Text,
    VStack,
} from '~components/ui';

let BarChart;
if (Platform.OS === 'web') {
    // For Web
    BarChart = require('react-gifted-charts').BarChart;
} else {
    // For iOS/Android (Mobile)
    BarChart = require('react-native-gifted-charts').BarChart;
}

const expenses = [
    { label: 'Jan', value: 120 },
    { label: 'Feb', value: 95 },
    { label: 'Mar', value: 140 },
    { label: 'Apr', value: 110 },
    { label: 'May', value: 130 },
    { label: 'Jun', value: 125 },
    { label: 'Jul', value: 150 },
    { label: 'Aug', value: 105 },
    { label: 'Sep', value: 135 },
    { label: 'Oct', value: 145 },
    { label: 'Nov', value: 115 },
    { label: 'Dec', value: 160 },
];

export default function ExpensePage() {
    const { width, height } = useWindowDimensions();

    return (
        <ScrollView className="min-h-screen bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Expenses for 2024
                </Heading>
            </HStack>
            <HStack className="mx-4 mt-2">
                <BarChart
                    data={expenses}
                    frontColor="lightgrey"
                    height={height * 0.3}
                    hideRule
                    initialSpacing={1}
                    isAnimated
                    renderTooltip={(item) => (
                        <VStack
                            style={{
                                marginBottom: 20,
                                paddingHorizontal: 10,
                                paddingVertical: 4,
                                borderRadius: 4,
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3,
                            }}
                        >
                            <Text className="bg-background-100 px-2 font-info shadow-sm">
                                ${Number(item.value).toFixed(2)}
                            </Text>
                        </VStack>
                    )}
                    width={width * 0.8}
                />
            </HStack>

            <ScrollView className="mx-4 mt-2 max-h-[15rem] bg-background-100 shadow-sm xl:max-h-[19rem]">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow className="bg-background-200/50">
                            <TableHead className="font-heading text-xl">
                                Date
                            </TableHead>
                            <TableHead className="text-center font-heading text-xl">
                                Total ($)
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {expenses.map((expense, index) => (
                            <TableRow key={index}>
                                <TableData className="font-body xl:text-lg">
                                    {expense.label}
                                </TableData>
                                <TableData className="text-center font-info xl:text-lg">
                                    {Number(expense.value).toFixed(2)}
                                </TableData>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollView>
        </ScrollView>
    );
}
