import { useState } from 'react';
import { DateType } from 'react-native-ui-datepicker';
import { DateSelector } from '~components';
import { HStack, Input, InputField, Text, VStack } from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DateInputFieldProps = {
    label: string;
    placeholder: string;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<DateType>>;
    error?: string;
    isInvalid?: boolean;
};

export default function DateInputField({
    label,
    placeholder,
    date,
    setDate,
    error,
    isInvalid,
}: DateInputFieldProps) {
    const [open, setOpen] = useState(false);
    const [dateString, setDateString] = useState('');

    return (
        <VStack className="w-full">
            <HStack className="mx-4 mt-1">
                <Text className="font-heading text-lg text-typography-900 xl:text-xl">
                    {label}
                </Text>
            </HStack>
            <HStack className="mx-4 mt-1">
                <Input
                    className="w-full bg-background-0 font-body"
                    isReadOnly={dateString !== ''}
                    size="xl"
                    variant="outline"
                >
                    <InputField
                        className="font-body"
                        onFocus={() => setOpen(true)}
                        placeholder={placeholder}
                        value={dateString}
                    />
                </Input>
            </HStack>

            {open && dateString === '' && (
                <DateSelector
                    date={date}
                    setDate={setDate}
                    setDateString={setDateString}
                    setOpen={setOpen}
                    title={`Select ${label}`}
                />
            )}

            {isInvalid && error && (
                <Text className="text-error-500">{error}</Text>
            )}
        </VStack>
    );
}
