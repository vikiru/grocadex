import { useLocalSearchParams } from 'expo-router';
import { ScrollView } from 'react-native';
import GroceryForm from '~components/forms/GroceryForm';
import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { VStack } from '~components/ui/vstack';
import GroceryCreateScreen from '~screens/GroceryCreateScreen';

function CreateGrocery() {
    const { userId, receiptId } = useLocalSearchParams();
    return (
        <GroceryCreateScreen
            receiptId={Number(receiptId)}
            userId={Number(userId)}
        />
    );
}

export default CreateGrocery;
