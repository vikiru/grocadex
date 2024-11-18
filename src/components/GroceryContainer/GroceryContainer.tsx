import { FormikErrors, FormikValues as Values } from 'formik';
import { ScrollView, Text, View } from 'react-native';

import { router } from 'expo-router';
import { Button } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/index';
import { formatDate } from '~utils/date';

type GroceryContainerProps = {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
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
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
};
function GroceryCard({ groceryItems, item, setFieldValue }: GroceryCardProps) {
    return (
        <View className="bg-white border border-gray-200 rounded-md p-2 mx-2 my-1">
            <View className="flex-row justify-between items-center">
                <Text className="font-semibold text-sm text-gray-800 flex-1">
                    {item.name} ({item.quantity})
                </Text>
                <Text className="text-sm font-semibold text-text">CAD${item.totalPrice}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-1">
                <Text className="text-xs text-gray-600">${item.unitPrice} each</Text>
                <Text className="text-xs text-red-500">Expires: {formatDate(item.expiryDate!, DateFormat)}</Text>
            </View>

            <View className="flex-row justify-between items-center mt-1">
                <Button icon="pencil" className="rounded-lg" onPress={() => handleEdit(item.id!)}>
                    Edit
                </Button>
                <Button
                    icon="cancel"
                    className="rounded-lg"
                    onPress={() => {
                        const updatedItems = handleDelete(groceryItems!, item);
                        setFieldValue('groceryItems', updatedItems);
                    }}
                >
                    Delete
                </Button>
            </View>
        </View>
    );
}

export default function GroceryContainer({ groceryItems, setFieldValue }: GroceryContainerProps) {
    return (
        <ScrollView className="flex flex-1 mx-2 max-h-60 pb-20">
            {groceryItems.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                <GroceryCard key={index} groceryItems={groceryItems} item={item} setFieldValue={setFieldValue} />
            ))}
        </ScrollView>
    );
}
