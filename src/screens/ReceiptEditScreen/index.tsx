import { useLocalSearchParams } from 'expo-router';
import { ReceiptForm } from '~components';
import { Heading, HStack, VStack } from '~components/ui';
import { useUpdateReceipt } from '~hooks';
import { useReceiptStore } from '~store';
import { Receipt } from '~types';

export default function ReceiptEditScreen() {
    const { id } = useLocalSearchParams();
    const { receipts } = useReceiptStore();
    const receipt = receipts.find(
        (receipt: Receipt) => receipt.id === Number(id),
    );
    const { handleUpdate } = useUpdateReceipt();
    return (
        <VStack className="min-h-screen w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Modify Receipt
                </Heading>
            </HStack>

            <ReceiptForm
                initialValues={receipt}
                onSubmit={handleUpdate}
                receiptId={receipt!.id}
                userId={receipt!.userId}
            />
        </VStack>
    );
}
