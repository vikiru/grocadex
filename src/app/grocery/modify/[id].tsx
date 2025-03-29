import { useLocalSearchParams, useRouter } from 'expo-router';
import { GroceryForm } from '~components/forms';
import { useUpdateItem } from '~hooks/useItem';
import GroceryEditScreen from '~screens/GroceryEditScreen';
import { useGroceryStore } from '~store/groceryStore';

function ModifyGrocery() {
    return <GroceryEditScreen />;
}

export default ModifyGrocery;
