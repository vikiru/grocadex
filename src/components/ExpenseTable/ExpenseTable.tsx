import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';
import { ExpenseFormat } from '~constants/Dates';
import { Expense } from '~types/Expense';
import { formatDate } from '~utils/date';

export default function ExpenseTable({ data }: { data: any }) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(6);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <View className="rounded-lg shadow-md py-4 my-2 mx-4">
            <DataTable className="w-full rounded-lg">
                <DataTable.Header>
                    <DataTable.Title>
                        <Text className="font-semibold text-base text-text font-heading">Purchase Date</Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text className="font-semibold text-base text-text font-heading">Total ($)</Text>
                    </DataTable.Title>
                </DataTable.Header>

                {data.slice(from, to).map((item: Expense) => (
                    <DataTable.Row key={item.month}>
                        <DataTable.Cell>
                            <Text className="text-text text-sm font-body">{formatDate(item.date, ExpenseFormat)}</Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text className="text-text text-sm font-body">${Number(item.amount).toFixed(2)}</Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    page={page}
                    numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
                    onPageChange={(page) => setPage(page)}
                    label={`${from + 1}-${to} of ${data.length}`}
                    showFastPaginationControls
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    onItemsPerPageChange={onItemsPerPageChange}
                    selectPageDropdownLabel={'Rows per page'}
                />
            </DataTable>
        </View>
    );
}
