import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert } from '~components';
import {
    Button,
    ButtonText,
    Card,
    Divider,
    Heading,
    HStack,
    Text,
} from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { FRONTEND_DASHBOARD_ROUTE } from '~constants/Routes';
import { useDeleteItem } from '~hooks';
import { GroceryItem } from '~types';
import { constructExpiryString, formatDate, parseDate } from '~utils/date';

type GroceryCardProps = {
    groceryItem: GroceryItem;
};

export default function GroceryCard({ groceryItem }: GroceryCardProps) {
    const router = useRouter();
    const { handleDelete } = useDeleteItem();

    if (!groceryItem) return null;

    return groceryItem ? (
        <Card className="h-fit w-full bg-background-200 p-5" size="md">
            <HStack className="flex items-center justify-between">
                <Heading className="mb-1 font-heading text-xl text-typography-800">
                    {groceryItem.name}
                </Heading>
                <Text className="mt-auto font-info text-2xl text-typography-950">
                    ${Number(groceryItem.totalPrice).toFixed(2)}
                </Text>
            </HStack>

            <Divider className="my-1/2 bg-background-400" />

            <HStack className="mt-2 flex w-full justify-between">
                <Text className="text-center font-info text-typography-700">
                    {groceryItem.quantity} purchased on{' '}
                    {formatDate(groceryItem.purchaseDate, DateFormat)}.{' '}
                    {constructExpiryString(parseDate(groceryItem.expiryDate))}
                </Text>
            </HStack>

            <HStack className="mt-2 justify-between gap-4">
                <Button
                    action="primary"
                    className="flex-1"
                    onPress={() =>
                        router.push(`/grocery/modify/${groceryItem.id}`)
                    }
                    size="md"
                    variant="solid"
                >
                    <ButtonText className="font-body text-lg">Edit</ButtonText>
                    <MaterialCommunityIcons
                        className="mb-1 ml-2"
                        color="white"
                        name="pencil"
                        size={24}
                    />
                </Button>

                <Alert
                    alertHeading="Are you sure you want to delete this item?"
                    alertText="Deleting this item will remove it permanently and cannot be undone. Please confirm if you wish to proceed."
                    handleDelete={async () => {
                        await handleDelete(
                            groceryItem.id!,
                            groceryItem.receiptId,
                        );
                        router.replace(FRONTEND_DASHBOARD_ROUTE);
                    }}
                />
            </HStack>
        </Card>
    ) : null;
}
