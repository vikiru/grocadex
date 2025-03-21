import {
    Table as ExpoTable,
    TBody as ExpoTBody,
    Caption as ExpoTCaption,
    TFoot as ExpoTFoot,
    THead as ExpoTHead,
    TR as ExpoTR,
} from '@expo/html-elements';
import React, { createContext, useContext, useMemo } from 'react';
import { Text, View } from 'react-native';

import {
    tableBodyStyle,
    tableCaptionStyle,
    tableDataStyle,
    tableFooterStyle,
    tableHeaderStyle,
    tableHeadStyle,
    tableRowStyleStyle,
    tableStyle,
} from './styles';

const TableHeaderContext = createContext<{
    isHeaderRow: boolean;
}>({
    isHeaderRow: false,
});
const TableFooterContext = createContext<{
    isFooterRow: boolean;
}>({
    isFooterRow: false,
});

type ITableBodyProps = React.ComponentProps<typeof ExpoTBody>;
type ITableCaptionProps = React.ComponentProps<typeof ExpoTCaption>;
type ITableDataProps = React.ComponentProps<typeof Text | typeof View> & {
    useRNView?: boolean;
};
type ITableFooterProps = React.ComponentProps<typeof ExpoTFoot>;
type ITableHeaderProps = React.ComponentProps<typeof ExpoTHead>;
type ITableHeadProps = React.ComponentProps<typeof Text | typeof View> & {
    useRNView?: boolean;
};
type ITableProps = React.ComponentProps<typeof ExpoTable>;
type ITableRowProps = React.ComponentProps<typeof ExpoTR>;

const Table = React.forwardRef<
    React.ComponentRef<typeof ExpoTable>,
    ITableProps
>(({ className, ...props }, ref) => {
    return (
        <ExpoTable
            className={tableStyle({ class: className })}
            // @ts-expect-error : ref type changed
            ref={ref}
            {...props}
        />
    );
});

const TableHeader = React.forwardRef<
    React.ComponentRef<typeof ExpoTHead>,
    ITableHeaderProps
>(function TableHeader({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
        return {
            isHeaderRow: true,
        };
    }, []);
    return (
        <TableHeaderContext.Provider value={contextValue}>
            <ExpoTHead
                className={tableHeaderStyle({ class: className })}
                // @ts-expect-error : ref type changed
                ref={ref}
                {...props}
            />
        </TableHeaderContext.Provider>
    );
});

const TableBody = React.forwardRef<
    React.ComponentRef<typeof ExpoTBody>,
    ITableBodyProps
>(function TableBody({ className, ...props }, ref) {
    return (
        <ExpoTBody
            className={tableBodyStyle({ class: className })}
            // @ts-expect-error : ref type changed
            ref={ref}
            {...props}
        />
    );
});

const TableFooter = React.forwardRef<
    React.ComponentRef<typeof ExpoTFoot>,
    ITableFooterProps
>(function TableFooter({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
        return {
            isFooterRow: true,
        };
    }, []);
    return (
        <TableFooterContext.Provider value={contextValue}>
            <ExpoTFoot
                className={tableFooterStyle({ class: className })}
                // @ts-expect-error : ref type changed
                ref={ref}
                {...props}
            />
        </TableFooterContext.Provider>
    );
});

const TableHead = React.forwardRef<
    React.ComponentRef<typeof Text | typeof View>,
    ITableHeadProps
>(function TableHead({ useRNView = false, className, ...props }, ref) {
    if (useRNView) {
        return (
            <View
                className={tableHeadStyle({ class: className })}
                ref={ref}
                {...props}
            />
        );
    } else {
        return (
            <Text
                className={tableHeadStyle({ class: className })}
                ref={ref}
                {...props}
            />
        );
    }
});

const TableRow = React.forwardRef<
    React.ComponentRef<typeof ExpoTR>,
    ITableRowProps
>(function TableRow({ className, ...props }, ref) {
    const { isHeaderRow } = useContext(TableHeaderContext);
    const { isFooterRow } = useContext(TableFooterContext);

    return (
        <ExpoTR
            className={tableRowStyleStyle({
                isHeaderRow,
                isFooterRow,
                class: className,
            })}
            // @ts-expect-error : ref type changed
            ref={ref}
            {...props}
        />
    );
});

const TableData = React.forwardRef<
    React.ComponentRef<typeof Text | typeof View>,
    ITableDataProps
>(function TableData({ useRNView = false, className, ...props }, ref) {
    if (useRNView) {
        return (
            <View
                className={tableDataStyle({ class: className })}
                ref={ref}
                {...props}
            />
        );
    } else {
        return (
            <Text
                className={tableDataStyle({ class: className })}
                ref={ref}
                {...props}
            />
        );
    }
});

const TableCaption = React.forwardRef<
    React.ComponentRef<typeof ExpoTCaption>,
    ITableCaptionProps
>(({ className, ...props }, ref) => {
    return (
        <ExpoTCaption
            className={tableCaptionStyle({ class: className })}
            // @ts-expect-error : ref type changed
            ref={ref}
            {...props}
        />
    );
});

Table.displayName = 'Table';
TableHeader.displayName = 'TableHeader';
TableBody.displayName = 'TableBody';
TableFooter.displayName = 'TableFooter';
TableHead.displayName = 'TableHead';
TableRow.displayName = 'TableRow';
TableData.displayName = 'TableData';
TableCaption.displayName = 'TableCaption';

export {
    Table,
    TableBody,
    TableCaption,
    TableData,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
};
