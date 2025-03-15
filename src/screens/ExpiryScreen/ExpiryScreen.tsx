import { ScrollView, View } from 'react-native';
import { Card, SearchBar } from '~components/index';

import React from 'react';
import { useActiveItem } from '~hooks/redux';

export default function ExpiryScreen() {
    const { activeItems } = useActiveItem();

    return (
        <ScrollView
            className="min-h-full min-w-full bg-background"
            horizontal={false}
        >
            <SearchBar placeholder="Search items..." />
            <View className="flex flex-col">
                {activeItems.map((item) => (
                    <Card variant="compact" item={item} key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
}
