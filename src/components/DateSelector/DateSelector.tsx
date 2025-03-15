import { FormikErrors, FormikValues as Values } from 'formik';
import React, { useState } from 'react';

import { View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { TextInput } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { formatDate } from '~utils/date';

type DatePickerProps = {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<Values> | void>;
    fieldName: string;
    label: string;
};

export default function DateSelector({
    setFieldValue,
    fieldName,
    label,
}: DatePickerProps) {
    const [purchaseString, setPurchaseString] = useState('');
    const [open, setOpen] = useState(false);
    const [editable, setEditable] = useState(true);

    return (
        <View className="mt-1">
            <TextInput
                className="rounded-lg bg-white"
                editable={editable}
                label={label}
                mode="outlined"
                onPress={() => setOpen(true)}
                placeholder={`Enter your ${label.toLowerCase()} date`}
                value={purchaseString}
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
