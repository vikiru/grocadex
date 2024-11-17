import { FormikErrors, FormikValues as Values } from 'formik';
import { Text, View } from 'react-native';

import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Stores } from '~constants/Stores';

type StorePickerProps = {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
};
export default function StorePicker({ setFieldValue }: StorePickerProps) {
    return (
        <View className="px-2">
            <Text className="ml-1 text-text text-md font-semibold font-heading">Store</Text>

            <View className="flex-1 mx-1 mt-1">
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
