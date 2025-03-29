import { useLocalSearchParams } from 'expo-router';
import { ReceiptForm } from '~components/forms';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { VStack } from '~components/ui/vstack';
import { useUpdateReceipt } from '~hooks/useReceiptForm';
import ReceiptEditScreen from '~screens/ReceiptEditScreen';
import { useReceiptStore } from '~store/receiptStore';
import { Receipt } from '~types/Receipt';

export default function ModifyReceipt() {
    return <ReceiptEditScreen />;
}
