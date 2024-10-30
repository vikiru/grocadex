import { ScrollView, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import React from 'react';
import GroceryItemCard from '~components/GroceryItemCard/GroceryItemCard';
import SearchBar from '~components/SearchBar/SearchBar';
import { useActiveItem } from '~hooks/redux/useActiveItem';

export default function ExpiryScreen() {
    const { activeItems } = useActiveItem();

    return (
        <StyledComponent component={ScrollView} horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search items..." />
            <StyledComponent component={View} className="flex flex-col">
                {activeItems.map((item) => (
                    <StyledComponent component={GroceryItemCard} item={item} key={item.id} />
                ))}
            </StyledComponent>
        </StyledComponent>
    );
}
