import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { Receipt } from '~types/index';
import { formatDate } from '~utils/date';

export default function ReceiptTable({ receipts }: { receipts: Receipt[] | Partial<Receipt>[] }) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(5);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, receipts.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <View className="rounded-lg shadow-md p-4">
            <DataTable className="w-full">
                <DataTable.Header>
                    <DataTable.Title>
                        <Text className="font-semibold text-base text-text font-heading">Purchased</Text>
                    </DataTable.Title>
                    <DataTable.Title>
                        <Text className="font-semibold text-base text-text font-heading">Store</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text className="font-semibold text-base text-text font-heading">Total ($)</Text>
                    </DataTable.Title>
                </DataTable.Header>

                {receipts.slice(from, to).map((receipt: Receipt | Partial<Receipt>) => (
                    <DataTable.Row key={receipt.id}>
                        <DataTable.Cell>
                            <Text className="text-text text-sm font-body">
                                {formatDate(receipt!.purchaseDate!, DateFormat)}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <Text className="text-text text-sm font-body">{receipt.store}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text className="text-text text-sm font-body">${Number(receipt.total).toFixed(2)}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(receipts.length / numberOfItemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${receipts.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </View>
    );
}
