import { MaterialCommunityIcons } from '@expo/vector-icons';
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
                <ScrollView className="mx-4 mb-6 max-h-[25rem] pb-16">
                    <VStack className="mt-4 gap-3">
                        {filteredGroceries.map(
                            (item: GroceryItem, index: number) => (
                                <GroceryCard
                                    deletable={false}
                                    editable={false}
                                    groceryItem={item}
                                    key={index}
                                    markable={true}
                                />
                            ),
                        )}
                    </VStack>
                </ScrollView>
            ) : (
                <Text className="mx-4 font-body text-lg text-typography-700 xl:text-xl">
                    No grocery items found.
                </Text>
            )}
        </VStack>
    );
}
