import { Text, View } from 'react-native';

import React from 'react';

export default function Logo() {
    return (
        <View className="flex-row mx-auto mt-5">
            <Text className="text-primary text-4xl font-bold font-heading">Grocery</Text>
            <Text className="text-secondary text-4xl font-bold font-heading">Tracker</Text>
        </View>
    );
}
