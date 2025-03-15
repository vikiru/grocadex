import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';
import { DateFormat } from '~constants/Dates';
import { Receipt } from '~types/index';
import { formatDate } from '~utils/date';

export default function ReceiptTable({
    receipts,
}: {
    receipts: Partial<Receipt>[];
}) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(5);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, receipts.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <View className="rounded-lg p-4">
            <DataTable className="w-full">
                <DataTable.Header>
                    <DataTable.Title>
                        <Text className="font-heading text-base font-semibold text-text">
                            Purchased
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title>
                        <Text className="font-heading text-base font-semibold text-text">
                            Store
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text className="font-heading text-base font-semibold text-text">
                            Total ($)
                        </Text>
                    </DataTable.Title>
                </DataTable.Header>

                {receipts
                    .slice(from, to)
                    .map((receipt: Partial<Receipt> | Receipt) => (
                        <DataTable.Row key={receipt.id}>
                            <DataTable.Cell>
                                <Text className="font-body text-sm text-text">
                                    {formatDate(
                                        receipt!.purchaseDate,
                                        DateFormat,
                                    )}
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell>
                                <Text className="font-body text-sm text-text">
                                    {receipt.store}
                                </Text>
                            </DataTable.Cell>
                            <DataTable.Cell numeric>
                                <Text className="font-body text-sm text-text">
                                    ${Number(receipt.total).toFixed(2)}
                                </Text>
                            </DataTable.Cell>
                        </DataTable.Row>
                    ))}

                <DataTable.Pagination
                    label={`${from + 1}-${to} of ${receipts.length}`}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    numberOfPages={Math.ceil(
                        receipts.length / numberOfItemsPerPage,
                    )}
                    onItemsPerPageChange={onItemsPerPageChange}
                    onPageChange={(page) => setPage(page)}
                    page={page}
                    selectPageDropdownLabel={'Rows per page'}
                    showFastPaginationControls
                />
            </DataTable>
        </View>
    );
}
