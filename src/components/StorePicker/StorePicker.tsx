import { FormikErrors, FormikValues as Values } from 'formik';
import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';
import { Stores } from '../../constants/Stores';

interface StorePickerProps {
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void | FormikErrors<Values>>;
}
export default function StorePicker({ setFieldValue }: StorePickerProps) {
    return (
        <StyledComponent component={View} className="px-2">
            <StyledComponent component={Text} className="ml-1 text-text text-md font-semibold font-heading">
                Store
            </StyledComponent>

            <StyledComponent component={View} className="flex-1 mx-1 mt-1">
                <StyledComponent
                    component={SelectList}
                    data={Stores}
                    setSelected={(item: { label: string; value: string }) => {
                        setFieldValue('store', item.value);
                    }}
                    search={false}
                    save="value"
                />
            </StyledComponent>
        </StyledComponent>
    );
}
