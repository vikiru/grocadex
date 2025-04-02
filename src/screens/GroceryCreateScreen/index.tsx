import { ScrollView } from 'react-native';
import { GroceryForm } from '~components';
import { Button, ButtonText, Heading, HStack, VStack } from '~components/ui';
import { useCreateItem } from '~hooks';

type GroceryCreateScreenProps = {
    userId: number;
    receiptId: number;
};

export default function GroceryCreateScreen({
    userId,
    receiptId,
}: GroceryCreateScreenProps) {
    const { handleCreate } = useCreateItem();
    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Grocery
                </Heading>
            </HStack>

            <GroceryForm
                onSubmit={handleCreate}
                receiptId={receiptId}
                userId={userId}
            />

            <HStack className="mx-4 mt-2">
                <VStack className="w-full gap-3">
                    <Button action="secondary" variant="solid">
                        <ButtonText className="mt-auto font-body xs:text-base xl:text-lg">
                            Cancel
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>
        </ScrollView>
    );
}
