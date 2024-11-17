import { ScrollView, View } from 'react-native';

import React from 'react';
import Card from '~components/Card/Card';
import SearchBar from '~components/SearchBar/SearchBar';
import { useActiveItem } from '~hooks/redux/useActiveItem';

export default function ExpiryScreen() {
    const { activeItems } = useActiveItem();

    return (
        <ScrollView horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search items..." />
            <View className="flex flex-col">
                {activeItems.map((item) => (
                    <Card variant="compact" item={item} key={item.id} />
                ))}
            </View>
        </ScrollView>
    );
}
