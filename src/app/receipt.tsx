import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView } from 'react-native';
import ReceiptCard from '~components/ReceiptCard';
import { Fab } from '~components/ui/fab';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function ReceiptPage() {
    return (
        <VStack className="bg-background-100">
            <HStack className="mx-4 mb-4 mt-2">
                <Input className="flex w-full items-center bg-background-0">
                    <InputField
                        className="font-body"
                        placeholder="Search your receipts"
                    />
                    <MaterialCommunityIcons name="magnify" size={24} />
                </Input>
            </HStack>

            <ScrollView className="mx-4 mb-6 mt-4 shadow-sm">
                <VStack className="gap-3">
                    <ReceiptCard />
                    <ReceiptCard />
                    <ReceiptCard />
                    <ReceiptCard />
                    <ReceiptCard />
                </VStack>
            </ScrollView>

            <Fab
                className="bg-background-100 hover:bg-background-200 active:bg-background-300"
                isDisabled={false}
                isHovered={false}
                isPressed={false}
                placement="bottom right"
                size="md"
            >
                <Text className="font-body text-typography-950">
                    Add Receipt
                </Text>
                <MaterialCommunityIcons
                    className="mt-auto text-typography-950"
                    name="plus"
                    size={24}
                />
            </Fab>
        </VStack>
    );
}

export default ReceiptPage;
