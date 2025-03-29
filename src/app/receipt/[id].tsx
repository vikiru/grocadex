import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ScrollView } from 'react-native';
import Alert from '~components/Alert';
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
import { DateFormat } from '~constants/Dates';
import {
    FRONTEND_RECEIPT_MODIFY_ROUTE,
    FRONTEND_RECEIPT_ROUTE,
} from '~constants/Routes';
import { useDeleteReceipt } from '~hooks/useReceiptForm';
import { ReceiptDetailsScreen } from '~screens/index';
import { useReceiptStore } from '~store/receiptStore';
import { Receipt } from '~types/Receipt';
import { formatDate, parseDate } from '~utils/date';

function ReceiptDetails() {
    return <ReceiptDetailsScreen />;
}

export default ReceiptDetails;
