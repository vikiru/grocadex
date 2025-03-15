import React from 'react';
import { View } from 'react-native';
import { ReceiptForm } from '~components/index';
import useReceipts from '~hooks/components/useReceipts';

export default function ReceiptCreateScreen() {
    const { handleCreate, loading, error } = useReceipts();
    return (
        <View>
            <ReceiptForm
                error={error}
                handleSubmit={handleCreate}
                loading={loading}
            />
        </View>
    );
}
