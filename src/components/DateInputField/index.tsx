import { useState } from 'react';
import { DateType } from 'react-native-ui-datepicker';
import DateSelector from '~components/DateSelector';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DateInputFieldProps = {
    label: string;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<DateType>>;
    error?: string;
    isInvalid?: boolean;
};

function DateInputField({
    label,
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
                        placeholder="Select a date"
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

export default DateInputField;
