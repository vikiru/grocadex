import { HStack, Input, InputField, Text, VStack } from '~components/ui';

type InputFieldProps = {
    label: string;
    value: string | number;
    secure?: boolean;
    onChangeText: (e: string | React.ChangeEvent<any>) => void;
    onBlur: (e: any) => void;
    error?: string;
    touched?: boolean;
    placeholder: string;
};

export const FormInput = ({
    label,
    value,
    secure = false,
    onChangeText,
    onBlur,
    error,
    touched,
    placeholder,
}: InputFieldProps) => {
    return (
        <HStack className="mx-4 mt-1">
            <VStack className="w-full">
                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                    {label}
                </Text>
                <Input
                    className="w-full bg-background-0 font-body"
                    size="xl"
                    variant="outline"
                >
                    <InputField
                        isInvalid={!!error && touched}
                        onBlur={onBlur}
                        onChangeText={onChangeText}
                        placeholder={placeholder}
                        secureTextEntry={secure}
                        value={value}
                    />
                </Input>
                {error && touched && (
                    <Text className="text-error-500">{error}</Text>
                )}
            </VStack>
        </HStack>
    );
};
