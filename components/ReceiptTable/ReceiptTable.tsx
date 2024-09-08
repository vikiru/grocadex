import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { StyledComponent } from 'nativewind';
import { DataTable } from 'react-native-paper';
import { Receipt } from '../../types/Receipt';

export default function ReceiptTable({ receipts }: { receipts: Receipt[] | Partial<Receipt>[] }) {
    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(5);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, receipts.length);

    useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    return (
        <StyledComponent component={View} className="rounded-lg shadow-md p-4">
            <StyledComponent component={DataTable} className="w-full">
                <DataTable.Header>
                    <DataTable.Title>
                        <StyledComponent component={Text} className="font-semibold text-xl text-text font-heading">
                            Purchase Date
                        </StyledComponent>
                    </DataTable.Title>
                    <DataTable.Title>
                        <StyledComponent component={Text} className="font-semibold text-xl text-text font-heading">
                            Store
                        </StyledComponent>
                    </DataTable.Title>
                    <DataTable.Title numeric>
                        <StyledComponent component={Text} className="font-semibold text-xl text-text font-heading">
                            Total ($)
                        </StyledComponent>
                    </DataTable.Title>
                </DataTable.Header>

                {receipts.slice(from, to).map((receipt: Receipt | Partial<Receipt>) => (
                    <DataTable.Row key={receipt.id}>
                        <DataTable.Cell>
                            <StyledComponent component={Text} className="text-text text-lg font-body">
                                {receipt.purchaseDate?.toLocaleDateString()}
                            </StyledComponent>
                        </DataTable.Cell>
                        <DataTable.Cell>
                            <StyledComponent component={Text} className="text-text text-lg font-body">
                                {receipt.store}
                            </StyledComponent>
                        </DataTable.Cell>
                        <DataTable.Cell numeric>
                            <StyledComponent component={Text} className="text-text text-lg font-body">
                                ${receipt.total?.toFixed(2)}
                            </StyledComponent>
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
            </StyledComponent>
        </StyledComponent>
    );
}
