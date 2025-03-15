import { Text, View } from 'react-native';

import React from 'react';

export default function Logo() {
    return (
        <View className="mx-auto mt-5 flex-row">
            <Text className="font-heading text-4xl font-bold text-primary">
                Grocery
            </Text>
            <Text className="font-heading text-4xl font-bold text-secondary">
                Tracker
            </Text>
        </View>
    );
}
