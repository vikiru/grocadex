import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import GroceryCard from '~components/GroceryCard';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { VStack } from '~components/ui/vstack';
import { useGroceryStore } from '~store/groceryStore';

import { GroceryItem } from '../types/GroceryItem';

function GroceryPage() {
    const groceryItems = useGroceryStore((state) => state.groceryItems);

    return (
        <VStack className="bg-background-100">
            <HStack className="mx-4 mb-4 mt-2">
                <Input className="flex w-full items-center bg-background-0">
                    <InputField
                        className="font-body"
                        placeholder="Search your groceries"
                    />
                    <MaterialCommunityIcons name="magnify" size={24} />
                </Input>
            </HStack>
            <ScrollView className="mx-4 mb-6 mt-4 shadow-sm">
                <VStack className="gap-3">
                    {groceryItems.map((groceryItem: GroceryItem, index) => (
                        <GroceryCard groceryItem={groceryItem} key={index} />
                    ))}
                </VStack>
            </ScrollView>
        </VStack>
    );
}

export default GroceryPage;
