import { useLocalSearchParams, useRouter } from 'expo-router';
import { GroceryForm } from '~components';
import { useUpdateItem } from '~hooks';
import { useGroceryStore } from '~store';

export default function GroceryEditScreen() {
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
