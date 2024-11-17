import { FormikErrors, FormikValues as Values } from 'formik';
import React, { useState } from 'react';

import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DatePickerProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
    fieldName: string;
    label: string;
};

export default function DateSelector({ setFieldValue, fieldName, label }: DatePickerProps) {
    const [purchaseString, setPurchaseString] = useState('');
    const [open, setOpen] = useState(false);
    const [editable, setEditable] = useState(true);

    return (
        <View className="mt-1">
            <TextInput
                mode="outlined"
                label={label}
                value={purchaseString}
                editable={editable}
                onPress={() => setOpen(true)}
                placeholder={`Enter your ${label.toLowerCase()} date`}
                className="bg-white rounded-lg"
            />

            <DateTimePickerModal
                isVisible={open}
                mode="date"
                onConfirm={(date) => {
                    const formattedDate = formatDate(date, DateFormat);
                    setPurchaseString(formattedDate);
                    setFieldValue(fieldName, date);
                    setEditable(false);
                }}
                onCancel={() => setOpen(false)}
            />
        </View>
    );
}
