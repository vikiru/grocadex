import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        <VStack className="min-h-screen bg-background-100">
            <Searchbar
                placeholder="Search your receipts"
                query={query}
                setQuery={setQuery}
            />

            {filteredReceipts.length > 0 && (
                <ScrollView className="mx-4 mb-6 pb-16 xs:max-h-[25rem] md:max-h-[40rem] lg:mt-8 lg:max-h-none">
                    <VStack className="mt-4 grid gap-3 xs:grid-cols-1 lg:grid-cols-3">
                        {filteredReceipts.map(
                            (receipt: Receipt, index: number) => (
                                <ReceiptCard key={index} receipt={receipt} />
                            ),
                        )}
                    </VStack>
                </ScrollView>
            )}

            {filteredReceipts.length === 0 && (
                <Text className="mx-4 font-body text-lg text-typography-700 xl:text-xl">
                    No receipts found.
                </Text>
            )}
        </VStack>
    );
}
