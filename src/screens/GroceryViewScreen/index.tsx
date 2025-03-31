import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import { GroceryCard, Searchbar } from '~components';
import { Text, VStack } from '~components/ui';
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
                <ScrollView className="mx-4 mb-6 mt-4 shadow-sm">
                    <VStack className="gap-3">
                        {filteredGroceries.map(
                            (groceryItem: GroceryItem, index) => (
                                <GroceryCard
                                    groceryItem={groceryItem}
                                    key={index}
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
