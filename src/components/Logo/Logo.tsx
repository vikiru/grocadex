import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';

export default function Logo() {
    return (
        <StyledComponent component={View} className="flex-row mx-auto mt-5">
            <StyledComponent component={Text} className="text-primary text-3xl font-bold font-heading">
                Grocery
            </StyledComponent>
            <StyledComponent component={Text} className="text-secondary text-3xl font-bold font-heading">
                Tracker
            </StyledComponent>
        </StyledComponent>
    );
}
