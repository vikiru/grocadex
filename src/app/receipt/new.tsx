import React from 'react';
import { View } from 'react-native';
import ReceiptForm from '~components/ReceiptForm/ReceiptForm';
import useReceipts from '~hooks/components/useReceipts';

export default function NewReceipt() {
    const { handleCreate, loading, error } = useReceipts();
    return (
        <View>
            <ReceiptForm handleSubmit={handleCreate} loading={loading} error={error} />
        </View>
    );
}
