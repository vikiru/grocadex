import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import ReceiptCard from '~components/ReceiptCard';
import { Fab } from '~components/ui/fab';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { FRONTEND_RECEIPT_CREATE_ROUTE } from '~constants/Routes';
import { useReceiptStore } from '~store/receiptStore';
import { Receipt } from '~types/Receipt';

function ReceiptPage() {
    const router = useRouter();
    const receipts = useReceiptStore((state) => state.receipts);

    return (
        <VStack className="bg-background-100">
            <HStack className="mx-4 mb-4 mt-2">
                <Input className="flex w-full items-center bg-background-0">
                    <InputField
                        className="font-body"
                        placeholder="Search your receipts"
                    />
                    <MaterialCommunityIcons name="magnify" size={24} />
                </Input>
            </HStack>

            <ScrollView className="mx-4 mb-6 mt-4 shadow-sm">
                <VStack className="gap-3">
                    {receipts.map((receipt: Receipt) => (
                        <ReceiptCard key={receipt.id} receipt={receipt} />
                    ))}
                </VStack>
            </ScrollView>

            <Fab
                className="fixed bottom-0 right-0 mb-4 mr-4 bg-background-100 hover:bg-background-200 active:bg-background-300"
                isDisabled={false}
                isHovered={false}
                isPressed={false}
                onPress={() => router.push(FRONTEND_RECEIPT_CREATE_ROUTE)}
                placement="bottom right"
                size="md"
            >
                <Text className="font-body text-typography-950">
                    Add Receipt
                </Text>
                <MaterialCommunityIcons
                    className="mt-auto text-typography-950"
                    name="plus"
                    size={24}
                />
            </Fab>
        </VStack>
    );
}

export default ReceiptPage;
