import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Alert from '~components/Alert';
import { Button, ButtonText } from '~components/ui/button';
import { Card } from '~components/ui/card';
import { Divider } from '~components/ui/divider';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Text } from '~components/ui/text';
import { DateFormat } from '~constants/Dates';
import { FRONTEND_DASHBOARD_ROUTE } from '~constants/Routes';
import { useDeleteItem } from '~hooks/useItem';
import { GroceryItem } from '~types/GroceryItem';
import { constructExpiryString, formatDate, parseDate } from '~utils/date';

type GroceryCardProps = {
    groceryItem: GroceryItem;
};

function GroceryCard({ groceryItem }: GroceryCardProps) {
    const router = useRouter();
    const { handleDelete } = useDeleteItem();

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
                        setTimeout(() => {
                            router.replace(FRONTEND_DASHBOARD_ROUTE);
                        }, 0);
                    }}
                />
            </HStack>
        </Card>
    ) : (
        <></>
    );
}

export default GroceryCard;
