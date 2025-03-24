import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker, {
    DateType,
    useDefaultStyles,
} from 'react-native-ui-datepicker';
import { Heading } from '~components/ui/heading';
import {
    Modal,
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
} from '~components/ui/modal';
import { VStack } from '~components/ui/vstack';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DateSelectorProps = {
    title: string;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<DateType>>;
    setOpen: (isOpen: boolean) => void;
    setDateString: React.Dispatch<React.SetStateAction<string>>;
};

function DateSelector({
    title,
    date,
    setDate,
    setDateString,
}: DateSelectorProps) {
    const defaultStyles = useDefaultStyles();
    const [open, setOpenState] = useState(true);

    const handleDateChange = ({ date }: { date: DateType }) => {
        setOpenState(false);
        setDateString(formatDate(date as Date, DateFormat));
        setDate(date);
    };

    return (
        <Modal isOpen={open} onClose={() => setOpenState(false)}>
            <ModalBackdrop />
            <ModalContent>
                <ModalHeader>
                    <Heading>{title}</Heading>
                    <ModalCloseButton>
                        <MaterialCommunityIcons name="close" size={24} />
                    </ModalCloseButton>
                </ModalHeader>

                <VStack className="mt-2">
                    <DateTimePicker
                        date={date}
                        mode="single"
                        onChange={handleDateChange}
                        styles={defaultStyles}
                    />
                </VStack>
            </ModalContent>
        </Modal>
    );
}

export default DateSelector;
