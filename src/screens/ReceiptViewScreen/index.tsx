import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { ReceiptCard, Searchbar } from '~components';
import { Fab, HStack, Text, VStack } from '~components/ui';
import { FRONTEND_RECEIPT_CREATE_ROUTE } from '~constants/Routes';
import { useSearchReceipts } from '~hooks';
import { Receipt } from '~types';

export default function ReceiptViewScreen() {
    const router = useRouter();
    const { query, setQuery, filteredReceipts } = useSearchReceipts();

    return (
        <VStack className="bg-background-100">
            <Searchbar
                placeholder="Search your receipts"
                query={query}
                setQuery={setQuery}
            />

            {filteredReceipts.length > 0 && (
                <FlashList
                    className="mx-4 mb-6 mt-4"
                    data={filteredReceipts}
                    estimatedItemSize={
                        filteredReceipts.length > 0
                            ? filteredReceipts.length
                            : 0
                    }
                    renderItem={({ item }) => (
                        <HStack className="my-2">
                            <ReceiptCard receipt={item} />
                        </HStack>
                    )}
                >
                    <VStack className="gap-3">
                        {filteredReceipts.map((receipt: Receipt) => (
                            <ReceiptCard key={receipt.id} receipt={receipt} />
                        ))}
                    </VStack>
                </FlashList>
            )}

            {filteredReceipts.length === 0 && (
                <Text className="mx-4 font-body text-lg text-typography-700 xl:text-xl">
                    No receipts found.
                </Text>
            )}

            <Fab
                className="fixed bottom-14 bg-background-100 hover:bg-background-200 active:bg-background-300"
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
