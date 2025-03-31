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
import { ExpenseViewScreen } from '~screens';

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
    return <ExpenseViewScreen />;
}
