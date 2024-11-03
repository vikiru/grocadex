import { Text, View } from 'react-native';
import { Button, Dialog as PaperDialog, Portal } from 'react-native-paper';

type DialogProps = {
    visible: boolean;
    headerText: string;
    bodyText: string;
    handleDelete: () => void;
    setDialogVisible: (visible: boolean) => void;
};

export default function Dialog({ visible, headerText, bodyText, handleDelete, setDialogVisible }: DialogProps) {
    const handleCancel = () => setDialogVisible(false);

    return (
        <View>
            <Portal>
                <PaperDialog visible={visible}>
                    <PaperDialog.Title>{headerText}</PaperDialog.Title>
                    <PaperDialog.Content>
                        <Text>{bodyText}</Text>
                    </PaperDialog.Content>
                    <PaperDialog.Actions>
                        <Button icon="cancel" onPress={handleCancel}>
                            Cancel
                        </Button>
                        <Button icon="delete" onPress={handleDelete}>
                            Delete
                        </Button>
                    </PaperDialog.Actions>
                </PaperDialog>
            </Portal>
        </View>
    );
}
