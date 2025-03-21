import { ScrollView } from 'react-native';
import GroceryCard from '~components/GroceryCard';
import ReceiptCard from '~components/ReceiptCard';
import { VStack } from '~components/ui/vstack';

function Test() {
    return (
        <ScrollView className="mx-6 mt-2 overflow-x-hidden">
            <VStack className="grid gap-4 xs:grid-cols-1 lg:grid-cols-2">
                <GroceryCard />
                <GroceryCard />
                <GroceryCard />
                <GroceryCard />
            </VStack>
        </ScrollView>
    );
}

export default Test;
