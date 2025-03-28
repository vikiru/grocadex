import { useLocalSearchParams, useRouter } from 'expo-router';
import { GroceryForm } from '~components/forms';
import { useUpdateItem } from '~hooks/useItem';
import { useGroceryStore } from '~store/groceryStore';

function ModifyGrocery() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const groceryItem = useGroceryStore((state) =>
        state.getGroceryItemById(Number(id)),
    );
    const { handleUpdate } = useUpdateItem();

    return (
        <GroceryForm
            id={Number(id)}
            initialValues={groceryItem}
            onSubmit={handleUpdate}
            receiptId={groceryItem!.receiptId}
            userId={groceryItem!.userId}
        />
    );
}

export default ModifyGrocery;
