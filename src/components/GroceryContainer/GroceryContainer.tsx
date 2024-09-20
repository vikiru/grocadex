import { FormikErrors, FormikValues as Values } from 'formik';
import { ScrollView, Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import { Button } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { GroceryItem } from '~types/GroceryItem';
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

const handleEdit = () => {};

type GroceryCardProps = {
    groceryItems: GroceryItem[] | Partial<GroceryItem>[];
    item: GroceryItem | Partial<GroceryItem>;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
};
function GroceryCard({ groceryItems, item, setFieldValue }: GroceryCardProps) {
    return (
        <StyledComponent component={View} className="bg-white border border-gray-200 rounded-md p-2 mx-2 my-1">
            <StyledComponent component={View} className="flex-row justify-between items-center">
                <StyledComponent component={Text} className="font-semibold text-sm text-gray-800 flex-1">
                    {item.name} ({item.quantity})
                </StyledComponent>
                <StyledComponent component={Text} className="text-sm font-semibold text-text">
                    CAD${item.totalPrice}
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="flex-row justify-between items-center mt-1">
                <StyledComponent component={Text} className="text-xs text-gray-600">
                    ${item.unitPrice} each
                </StyledComponent>
                <StyledComponent component={Text} className="text-xs text-red-500">
                    Expires: {formatDate(item.expiryDate!, DateFormat)}
                </StyledComponent>
            </StyledComponent>

            <StyledComponent component={View} className="flex-row justify-between items-center mt-1">
                <StyledComponent component={Button} icon="pencil" className="rounded-lg">
                    Edit
                </StyledComponent>
                <StyledComponent
                    component={Button}
                    icon="cancel"
                    className="rounded-lg"
                    onPress={() => {
                        const updatedItems = handleDelete(groceryItems!, item);
                        setFieldValue('groceryItems', updatedItems);
                    }}
                >
                    Delete
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}

export default function GroceryContainer({ groceryItems, setFieldValue }: GroceryContainerProps) {
    return (
        <StyledComponent component={ScrollView} className="flex flex-1 mx-2 max-h-60 pb-20">
            {groceryItems.map((item: GroceryItem | Partial<GroceryItem>, index: number) => (
                <GroceryCard key={index} groceryItems={groceryItems} item={item} setFieldValue={setFieldValue} />
            ))}
        </StyledComponent>
    );
}
