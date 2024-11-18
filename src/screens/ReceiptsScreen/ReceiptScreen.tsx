import { ScrollView, View } from 'react-native';
import { Card, SearchBar } from '~components/index';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FAB } from 'react-native-paper';
import { useReceipt } from '~hooks/redux';
import { Receipt } from '~types/index';

export default function ReceiptsScreen() {
    const { receipts } = useReceipt();
    const navigation = useNavigation();

    return (
        <ScrollView horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search receipts..." />
            <View className="grid grid-cols-3">
                {receipts.map((receipt: Receipt | Partial<Receipt>) => (
                    <Card variant="receipt" receipt={receipt} key={receipt.id} />
                ))}
            </View>
            <FAB
                icon="plus"
                onPress={() => {
                    navigation.navigate('receipts/create');
                }}
                className="absolute bottom-10 right-10 z-0 bg-white"
            />
        </ScrollView>
    );
}
