import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView } from 'react-native';
import { DateType } from 'react-native-ui-datepicker';
import DateInputField from '~components/DateInputField';
import ReceiptForm from '~components/forms/ReceiptForm';
import { Button } from '~components/ui/button';
import { Heading } from '~components/ui/heading';
import { HStack } from '~components/ui/hstack';
import { Input, InputField } from '~components/ui/input';
import { Text } from '~components/ui/text';
import { VStack } from '~components/ui/vstack';
import { useCreateReceipt } from '~hooks/useReceiptForm';
import ReceiptCreateScreen from '~screens/ReceiptCreateScreen';
import { useUserStore } from '~store/userStore';

function CreateReceipt() {
    return <ReceiptCreateScreen />;
}

export default CreateReceipt;
