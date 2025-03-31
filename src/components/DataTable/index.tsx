import { Table } from '@expo/html-elements';
import TablePagination from '~components/TablePagination';
import {
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    VStack,
} from '~components/ui';
import { useTablePagination } from '~hooks';
import { Expense, Receipt } from '~types';
import { formatDate } from '~utils/date';

type DataFormat = 'numeric' | 'date' | 'string';

type DataTableProps = {
    data: (Receipt | Expense)[];
    headers: string[];
    dataKeys: {
        format: DataFormat;
        key: string;
    }[];
    dateFormat: string;
};

const test = [
    { store: 'eBay', purchaseDate: '2024-11-27', total: 237.02 },
    { store: 'Apple', purchaseDate: '2024-08-20', total: 415.75 },
    { store: 'Costco', purchaseDate: '2024-10-26', total: 175.6 },
    { store: 'Costco', purchaseDate: '2024-10-23', total: 322.69 },
    { store: 'Amazon', purchaseDate: '2024-08-26', total: 265.51 },
    { store: 'Costco', purchaseDate: '2024-10-28', total: 330.88 },
    { store: 'Costco', purchaseDate: '2025-03-03', total: 17.38 },
    { store: 'Amazon', purchaseDate: '2024-09-06', total: 353.6 },
    { store: 'Amazon', purchaseDate: '2024-04-20', total: 467.44 },
    { store: 'Walmart', purchaseDate: '2024-05-03', total: 27.74 },
];

export default function DataTable({
    data,
    headers,
    dataKeys,
    dateFormat,
}: DataTableProps) {
    const {
        startIndex,
        page,
        pageSize,
        handleSkipToPage,
        handleIncrementPage,
        handleDecrementPage,
    } = useTablePagination();
    const numPages = Math.ceil(data.length / pageSize);

    return (
        <VStack className="mx-4 mb-6 mt-4 bg-background-100 shadow-sm">
            <Table className="w-full">
                <TableHeader>
                    <TableRow className="bg-background-200/50">
                        {headers.map((header, index) => (
                            <TableHead
                                className="font-heading text-lg"
                                key={index}
                            >
                                {header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data
                        .slice(startIndex, startIndex + pageSize)
                        .map((item: any, index: number) => (
                            <TableRow key={index}>
                                {dataKeys.map(
                                    (
                                        dataKey: {
                                            key: string;
                                            format: DataFormat;
                                        },
                                        index: number,
                                    ) => (
                                        <TableData
                                            className={`${dataKey.format !== 'string' ? 'font-info' : 'font-body'} text-base`}
                                            key={index}
                                        >
                                            {dataKey.format === 'numeric'
                                                ? `$${formatData(item[dataKey.key], dataKey.format, dateFormat)}`
                                                : formatData(
                                                      item[dataKey.key],
                                                      dataKey.format,
                                                      dateFormat,
                                                  )}
                                        </TableData>
                                    ),
                                )}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            {numPages > 1 && (
                <TablePagination
                    handleDecrementPage={handleDecrementPage}
                    handleIncrementPage={handleIncrementPage}
                    handleSkipToPage={handleSkipToPage}
                    numPages={numPages}
                    page={page}
                />
            )}
        </VStack>
    );
}

function formatData(
    value: number | string | Date,
    format: DataFormat,
    dateFormat: string,
): number | string {
    switch (format) {
        case 'date':
            return formatDate(value as Date, dateFormat);
        case 'numeric':
            return Number(value).toFixed(2);
        case 'string':
            return value as string;
        default:
            return value as string;
    }
}
