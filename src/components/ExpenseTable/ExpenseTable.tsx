import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import { DataTable } from 'react-native-paper';

export default function ExpenseTable({ data }: { data: any }) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(6);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <StyledComponent component={View} className="rounded-lg shadow-md p-4 border-2 border-primary m-2">
            <StyledComponent component={DataTable} className="w-full rounded-lg">
                <DataTable.Header>
                    <DataTable.Title>
                        <StyledComponent component={Text} className="font-semibold text-xl text-text font-heading">
                            Purchase Date
                        </StyledComponent>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <StyledComponent component={Text} className="font-semibold text-xl text-text font-heading">
                            Total ($)
                        </StyledComponent>
                    </DataTable.Title>
                </DataTable.Header>

                {data.slice(from, to).map((item: any) => (
                    <DataTable.Row key={item.month}>
                        <StyledComponent component={DataTable.Cell}>
                            <StyledComponent component={Text} className="text-text text-lg font-body">
                                {item.month} 2024
                            </StyledComponent>
                        </StyledComponent>
                        <DataTable.Cell numeric>
                            <StyledComponent component={Text} className="text-text text-lg font-body">
                                ${item.value.toFixed(2)}
                            </StyledComponent>
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
            </StyledComponent>
        </StyledComponent>
    );
}
