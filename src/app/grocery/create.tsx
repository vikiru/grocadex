import { useLocalSearchParams } from 'expo-router';
import { GroceryCreateScreen } from '~screens';

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
