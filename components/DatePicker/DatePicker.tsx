import { FormikErrors, FormikValues as Values } from 'formik';
import React, { useState } from 'react';
import { createDateFromTimestamp, formatDate } from '../../utils/date';

import DateTimePicker from '@react-native-community/datetimepicker';
import { StyledComponent } from 'nativewind';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { DateFormat } from '../../constants/Dates';

interface DatePickerProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
    fieldName: string;
    label: string;
    date: Date;
}

export default function DatePicker({ setFieldValue, fieldName, label, date }: DatePickerProps) {
    const [purchaseString, setPurchaseString] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <StyledComponent component={View} className="mt-1">
            <StyledComponent
                component={TextInput}
                mode="outlined"
                label={label}
                value={purchaseString}
                onPress={() => setShowDatePicker(true)}
                placeholder="Enter your purchase date"
                className="bg-white rounded-lg"
            />

            {showDatePicker && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={(date) => {
                        const millis = date.nativeEvent.timestamp;
                        const selectedDate = createDateFromTimestamp(millis);
                        const formattedDate = formatDate(selectedDate, DateFormat);
                        setFieldValue(fieldName, selectedDate);
                        setPurchaseString(formattedDate);
                        setShowDatePicker(false);
                    }}
                />
            )}
        </StyledComponent>
    );
}
