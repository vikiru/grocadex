import { router, useLocalSearchParams } from 'expo-router';

import { StyledComponent } from 'nativewind';
import { View } from 'react-native';
import GroceryModal from '~components/GroceryModal/GroceryModal';
import Loader from '~components/Loader/Loader';
import useItem from '~hooks/components/useItem';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { GroceryItem } from '~types/GroceryItem';

export default function GroceryItemEditScreen() {
    const local = useLocalSearchParams();
    const { id } = local;
    const { handleUpdate, loading, error } = useItem();
    const { activeItems } = useActiveItem();
    const groceryItem = activeItems.find((item: GroceryItem | Partial<GroceryItem>) => item.id === Number(id));

    return (
        <StyledComponent component={View}>
            <GroceryModal
                method="Update"
                initialValues={groceryItem}
                visible={true}
                onDismiss={() => router.back()}
                onSubmit={(values: GroceryItem) => handleUpdate(values)}
            />

            <Loader loading={loading} />
        </StyledComponent>
    );
}
