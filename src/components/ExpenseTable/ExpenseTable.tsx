import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { DataTable } from 'react-native-paper';
import { ExpenseFormat } from '~constants/Dates';
import { Expense } from '~types/index';
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
        <View className="mx-4 my-2 rounded-lg py-4 shadow-md">
            <DataTable className="w-full rounded-lg">
                <DataTable.Header>
                    <DataTable.Title>
                        <Text className="font-heading text-base font-semibold text-text">
                            Purchase Date
                        </Text>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <Text className="font-heading text-base font-semibold text-text">
                            Total ($)
                        </Text>
                    </DataTable.Title>
                </DataTable.Header>

                {data.slice(from, to).map((item: Expense) => (
                    <DataTable.Row key={item.month}>
                        <DataTable.Cell>
                            <Text className="font-body text-sm text-text">
                                {formatDate(item.date, ExpenseFormat)}
                            </Text>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <Text className="font-body text-sm text-text">
                                ${Number(item.amount).toFixed(2)}
                            </Text>
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}

                <DataTable.Pagination
                    label={`${from + 1}-${to} of ${data.length}`}
                    numberOfItemsPerPage={numberOfItemsPerPage}
                    numberOfPages={Math.ceil(
                        data.length / numberOfItemsPerPage,
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
