import { Text, View } from 'react-native';
import { Button, Dialog as PaperDialog, Portal } from 'react-native-paper';

import { StyledComponent } from 'nativewind';

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
        <StyledComponent component={View}>
            <Portal>
                <PaperDialog visible={visible}>
                    <PaperDialog.Title>{headerText}</PaperDialog.Title>
                    <PaperDialog.Content>
                        <Text>{bodyText}</Text>
                    </PaperDialog.Content>
                    <PaperDialog.Actions>
                        <StyledComponent component={Button} icon="cancel" onPress={handleCancel}>
                            Cancel
                        </StyledComponent>
                        <StyledComponent component={Button} icon="delete" onPress={handleDelete}>
                            Delete
                        </StyledComponent>
                    </PaperDialog.Actions>
                </PaperDialog>
            </Portal>
        </StyledComponent>
    );
}
