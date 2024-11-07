import { router } from 'expo-router';
import { View } from 'react-native';
import GroceryModal from '~components/GroceryModal/GroceryModal';
import Loader from '~components/Loader/Loader';
import useItem from '~hooks/components/useItem';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { GroceryItem } from '~types/GroceryItem';

export default function GroceryItemEditScreen({ route }) {
    const { id } = route.params;
    const { handleUpdate, loading, error } = useItem();
    const { activeItems } = useActiveItem();
    const groceryItem = activeItems.find((item: GroceryItem | Partial<GroceryItem>) => item.id === Number(id));

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
