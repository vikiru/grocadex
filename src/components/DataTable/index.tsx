import TablePagination from '~components/TablePagination';
import {
    Table,
    TableBody,
    TableData,
    TableHead,
    TableHeader,
    TableRow,
    VStack,
} from '~components/ui';
import { useTablePagination } from '~hooks';
import { GraphData, GroceryItem, Receipt } from '~types';
import { formatDate } from '~utils/date';

type DataFormat = 'numeric' | 'date' | 'string';

type DataTableProps = {
    data: (Receipt | GraphData | GroceryItem)[];
    headers: string[];
    dataKeys: {
        format: DataFormat;
        key: string;
    }[];
    dateFormat: string;
    pageSize: number;
};

export default function DataTable({
    data,
    headers,
    dataKeys,
    dateFormat,
    pageSize,
}: DataTableProps) {
    const {
        startIndex,
        page,
        handleSkipToPage,
        handleIncrementPage,
        handleDecrementPage,
    } = useTablePagination();
    const numPages = Math.ceil(data.length / pageSize);

    return (
        <VStack className="mx-4 mt-4 bg-background-100 shadow-sm">
            <Table className="max-h-[20rem] w-full">
                <TableHeader>
                    <TableRow className="bg-background-200/50">
                        {headers.map((header, index) => (
                            <TableHead
                                className={`font-heading text-lg ${dataKeys[index].format === 'numeric' ? 'text-right' : ''}`}
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
                                            className={`font-info ${dataKey.format === 'numeric' ? 'text-right' : ''} xs:text-base lg:text-lg`}
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
                    itemSize={data.length}
                    numPages={numPages}
                    page={page}
                    pageSize={pageSize}
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
