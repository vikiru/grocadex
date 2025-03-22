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
    setDate: (date: DateType) => void;
};

function DateInputField({ label, date, setDate }: DateInputFieldProps) {
    const [open, setOpen] = useState(false);

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
                    size="xl"
                    variant="outline"
                >
                    <InputField
                        className="font-body"
                        onFocus={() => setOpen(true)}
                        placeholder="Select a date"
                        value={date ? formatDate(date, DateFormat) : ''}
                    />
                </Input>
            </HStack>

            {open && (
                <DateSelector
                    date={date}
                    setDate={setDate}
                    setOpen={setOpen}
                    title={`Select ${label}`}
                />
            )}
        </VStack>
    );
}

export default DateInputField;
