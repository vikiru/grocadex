import { useLocalSearchParams } from 'expo-router';

import { GroceryForm } from '@/components';
import { useUpdateItem } from '@/hooks';
import { useGroceryStore } from '@/store';

export default function GroceryEditScreen() {
    const { id } = useLocalSearchParams();
    const groceryItem = useGroceryStore((state) => state.getGroceryItemById(Number(id)));
    const { handleUpdate } = useUpdateItem();

    return (
        <GroceryForm
            id={Number(id)}
            initialValues={groceryItem}
            onSubmit={(values) => {
                const purchaseDate = 'purchaseDate' in values ? values.purchaseDate : undefined;
                const isActive = 'isActive' in values ? values.isActive : undefined;
                return handleUpdate({
                    ...groceryItem!,
                    ...values,
                    id: groceryItem!.id,
                    userId: groceryItem!.userId,
                    receiptId: groceryItem!.receiptId,
                    purchaseDate: purchaseDate ?? groceryItem!.purchaseDate,
                    isActive: isActive ?? groceryItem!.isActive,
                });
            }}
            receiptId={groceryItem!.receiptId}
            userId={groceryItem!.userId}
        />
    );
}
