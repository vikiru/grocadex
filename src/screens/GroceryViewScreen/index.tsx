import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { ScrollView } from 'react-native';
import { GroceryCard, Searchbar } from '~components';
import { HStack, Text, VStack } from '~components/ui';
import { useSearchGroceries } from '~hooks';
import { useGroceryStore } from '~store';
import { GroceryItem } from '~types';

export default function GroceryViewScreen() {
    const { query, setQuery, filteredGroceries } = useSearchGroceries();
    return (
        <VStack className="bg-background-100">
            <Searchbar
                placeholder="Search your groceries"
                query={query}
                setQuery={setQuery}
            />
            {filteredGroceries.length > 0 ? (
                <FlashList
                    className="mx-4 mb-6 mt-4"
                    data={filteredGroceries}
                    estimatedItemSize={
                        filteredGroceries.length > 0
                            ? filteredGroceries.length
                            : 0
                    }
                    renderItem={({ item }) => (
                        <HStack className="my-2">
                            <GroceryCard groceryItem={item} />
                        </HStack>
                    )}
                ></FlashList>
            ) : (
                <Text className="mx-4 font-body text-lg text-typography-700 xl:text-xl">
                    No grocery items found.
                </Text>
            )}
        </VStack>
    );
}
