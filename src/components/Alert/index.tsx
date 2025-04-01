import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogBackdrop,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    Button,
    ButtonText,
    Heading,
    Text,
} from '~components/ui';

type AlertProps = {
    alertHeading: string;
    alertText: string;
    handleDelete: (id: number, receiptId?: number) => Promise<void>;
};

export default function Alert({
    alertHeading,
    alertText,
    handleDelete,
}: AlertProps) {
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const handleClose = () => setShowAlertDialog(false);

    return (
        <>
            <Button
                action="negative"
                className="flex-1"
                onPress={() => setShowAlertDialog(true)}
                size="md"
                variant="solid"
            >
                <ButtonText className="font-body text-lg">Delete</ButtonText>
                <MaterialCommunityIcons
                    className="mb-1 ml-2"
                    color="white"
                    name="trash-can"
                    size={24}
                />
            </Button>
            <AlertDialog
                isOpen={showAlertDialog}
                onClose={handleClose}
                size="md"
            >
                <AlertDialogBackdrop />
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <Heading
                            className="font-semibold text-typography-950"
                            size="md"
                        >
                            {alertHeading}
                        </Heading>
                    </AlertDialogHeader>
                    <AlertDialogBody className="mb-4 mt-3">
                        <Text size="sm">{alertText}</Text>
                    </AlertDialogBody>
                    <AlertDialogFooter className="">
                        <Button
                            action="secondary"
                            onPress={async () => {
                                handleClose();
                                setShowAlertDialog(false);
                            }}
                            size="sm"
                            variant="outline"
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            onPress={(id: number, receiptId?: number) => {
                                if (receiptId) handleDelete(id, receiptId);
                                else handleDelete(id);
                                setShowAlertDialog(false);
                            }}
                            size="sm"
                        >
                            <ButtonText>Delete</ButtonText>
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
