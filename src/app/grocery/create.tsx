import { useState } from 'react';
import { ScrollView } from 'react-native';
import DateInputField from '~components/DateInputField';
import { Button, ButtonText } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';

function CreateGrocery() {
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [expiryDate, setExpiryDate] = useState(new Date());

    return (
        <ScrollView className="w-full bg-background-100">
            <HStack className="mx-4 mt-2">
                <Heading className="font-heading xs:text-3xl xl:text-4xl">
                    Create Grocery
                </Heading>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Name
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter name of grocery item"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Store Name
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter name of store"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <DateInputField
                date={purchaseDate}
                label="Purchase Date"
                setDate={setPurchaseDate}
            />

            <DateInputField
                date={expiryDate}
                label="Expiry Date"
                setDate={setExpiryDate}
            />

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Unit Price
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter unit price of the item"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-1">
                <VStack className="w-full">
                    <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                        Total Price
                    </Text>
                    <HStack>
                        <Input
                            className="w-full bg-background-0 font-body"
                            size="xl"
                            variant="outline"
                        >
                            <InputField
                                className="font-body"
                                placeholder="Enter total price of the item"
                            />
                        </Input>
                    </HStack>
                </VStack>
            </HStack>

            <HStack className="mx-4 mt-4">
                <VStack className="w-full gap-3">
                    <Button action="primary" variant="solid">
                        <ButtonText className="mt-auto font-body xs:text-base xl:text-lg">
                            Create Item
                        </ButtonText>
                    </Button>
                </VStack>
            </HStack>

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
