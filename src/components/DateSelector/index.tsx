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

type DateSelectorProps = {
    title: string;
    date: DateType;
    setDate: React.Dispatch<React.SetStateAction<Date>>;
    setOpen: (isOpen: boolean) => void;
};

function DateSelector({ title, date, setDate, setOpen }: DateSelectorProps) {
    const defaultStyles = useDefaultStyles();
    const [showModal, setShowModal] = useState(true);

    const handleDateChange = ({ date }: { date: DateType }) => {
        setShowModal(false);
        setOpen(false);
        setDate(date);
    };

    return (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
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
