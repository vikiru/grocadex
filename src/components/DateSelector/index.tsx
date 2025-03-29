import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import DateTimePicker, {
    DateType,
    useDefaultStyles,
} from 'react-native-ui-datepicker';
import {
    Heading,
    Modal,
    ModalBackdrop,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    VStack,
} from '~components/ui';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DateSelectorProps = {
    title: string;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<DateType>>;
    setOpen: (isOpen: boolean) => void;
    setDateString: React.Dispatch<React.SetStateAction<string>>;
};

export default function DateSelector({
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
