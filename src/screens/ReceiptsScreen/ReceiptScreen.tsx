import { ScrollView, View } from 'react-native';

import { router } from 'expo-router';
import React from 'react';
import { FAB } from 'react-native-paper';
import ReceiptCard from '~components/ReceiptCard/ReceiptCard';
import SearchBar from '~components/SearchBar/SearchBar';
import { useReceipt } from '~hooks/redux/useReceipt';
import { Receipt } from '~types/Receipt';

export default function ReceiptsScreen() {
    const { receipts } = useReceipt();

    return (
        <ScrollView horizontal={false} className="bg-background min-h-full min-w-full">
            <SearchBar placeholder="Search receipts..." />
            <View className="grid grid-cols-3">
                {receipts.map((receipt: Receipt | Partial<Receipt>) => (
                    <ReceiptCard receipt={receipt} key={receipt.id} />
                ))}
            </View>
            <FAB
                icon="plus"
                onPress={() => {
                    router.push('/receipt/new');
                }}
                className="absolute bottom-10 right-10 z-0 bg-white"
            />
        </ScrollView>
    );
}
