import { FormikErrors, FormikValues as Values } from 'formik';
import { Text, View } from 'react-native';

import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Stores } from '~constants/Stores';

type StorePickerProps = {
    setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean,
    ) => Promise<FormikErrors<Values> | void>;
};
export default function StorePicker({ setFieldValue }: StorePickerProps) {
    return (
        <View className="px-2">
            <Text className="text-md ml-1 font-heading font-semibold text-text">
                Store
            </Text>

            <View className="mx-1 mt-1 flex-1">
                <SelectList
                    data={Stores}
                    setSelected={(item: { label: string; value: string }) => {
                        setFieldValue('store', item.value);
                    }}
                    search={false}
                    save="value"
                />
            </View>
        </View>
    );
}
