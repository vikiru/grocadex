import { ReceiptForm } from '~components/forms';
import { Heading, HStack, VStack } from '~components/ui';
import { useCreateReceipt } from '~hooks/useReceiptForm';
import { useUserStore } from '~store/userStore';

export default function ReceiptCreateScreen() {
    const { handleCreate } = useCreateReceipt();
    const user = useUserStore((state) => state.user);

    return (
        <VStack className="min-h-screen w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Receipt
                </Heading>
            </HStack>

            {user?.id && (
                <ReceiptForm onSubmit={handleCreate} userId={user.id} />
            )}
        </VStack>
    );
}
