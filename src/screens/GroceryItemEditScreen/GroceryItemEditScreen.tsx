import { GroceryModal, Loader } from '~components/index';

import { router } from 'expo-router';
import { View } from 'react-native';
import { useItem } from '~hooks/components';
import { useActiveItem } from '~hooks/redux';
import { GroceryItem } from '~types/index';

export default function GroceryItemEditScreen({ route }: any) {
    const { id } = route.params;
    const { handleUpdate, loading, error } = useItem();
    const { activeItems } = useActiveItem();
    const groceryItem = activeItems.find(
        (item: GroceryItem | Partial<GroceryItem>) => item.id === Number(id),
    );

    return (
        <View>
            <GroceryModal
                method="Update"
                initialValues={groceryItem}
                visible={true}
                onDismiss={() => router.back()}
                onSubmit={(values: GroceryItem) => handleUpdate(values)}
            />

            <Loader loading={loading} />
        </View>
    );
}
