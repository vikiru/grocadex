import { ScrollView } from 'react-native';
import GroceryForm from '~components/forms/GroceryForm';
import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { VStack } from '~components/ui/vstack';

type CreateGroceryProps = {
    userId: number;
    receiptId: number;
};

function CreateGrocery({ userId, receiptId }: CreateGroceryProps) {
    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Grocery
                </Heading>
            </HStack>

            <GroceryForm receiptId={receiptId} userId={userId} />

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

export default CreateGrocery;
