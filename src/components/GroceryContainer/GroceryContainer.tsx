import { FormikErrors, FormikValues as Values } from 'formik';
import { ScrollView, Text, View } from 'react-native';

import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/index';
import { formatDate } from '~utils/date';

// TODO: Separate components, functions into separate hooks.

type GroceryContainerProps = {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<Values> | void>;
};

const handleDelete = (
    groceryItems: GroceryItem[] | Partial<GroceryItem>[],
    groceryItem: GroceryItem | Partial<GroceryItem>,
) => {
    return groceryItems.filter((item) => item !== groceryItem);
};

const handleEdit = (id: number) => {
    router.push(`/grocery/${id}`);
};

type GroceryCardProps = {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
    item: GroceryItem | Partial<GroceryItem>;
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<Values> | void>;
};
export default function GroceryContainer({
    groceryItems,
    setFieldValue,
}: GroceryContainerProps) {
    return (
        <ScrollView className="mx-2 flex max-h-60 flex-1 pb-20">
            {groceryItems.map(
                (item: GroceryItem | Partial<GroceryItem>, index: number) => (
                    <GroceryCard
                        groceryItems={groceryItems}
                        item={item}
                        key={index}
                        setFieldValue={setFieldValue}
                    />
                ),
            )}
        </ScrollView>
    );
}

function GroceryCard({ groceryItems, item, setFieldValue }: GroceryCardProps) {
    return (
        <View className="mx-2 my-1 rounded-md border border-gray-200 bg-white p-2">
            <View className="flex-row items-center justify-between">
                <Text className="flex-1 text-sm font-semibold text-gray-800">
                    {item.name} ({item.quantity})
                </Text>
                <Text className="text-sm font-semibold text-text">
                    CAD${item.totalPrice}
                </Text>
            </View>

            <View className="mt-1 flex-row items-center justify-between">
                <Text className="text-xs text-gray-600">
                    ${item.unitPrice} each
                </Text>
                <Text className="text-xs text-red-500">
                    Expires: {formatDate(item.expiryDate, DateFormat)}
                </Text>
            </View>

            <View className="mt-1 flex-row items-center justify-between">
                <Button
                    className="rounded-lg"
                    icon="pencil"
                    onPress={() => handleEdit(item.id)}
                >
                    Edit
                </Button>
                <Button
                    className="rounded-lg"
                    icon="cancel"
                    onPress={() => {
                        const updatedItems = handleDelete(groceryItems, item);
                        setFieldValue('groceryItems', updatedItems);
                    }}
                >
                    Delete
                </Button>
            </View>
        </View>
    );
}
