import React, { createContext, useContext, useMemo } from 'react';

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

const Table = React.forwardRef<HTMLTableElement, React.ComponentProps<'table'>>(
    function Table({ className, ...props }, ref) {
        return (
            <table
                className={tableStyle({ class: className })}
                ref={ref}
                {...props}
            />
        );
    },
);

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentProps<'thead'>
>(function TableHeader({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
        return {
            isHeaderRow: true,
        };
    }, []);
    return (
        <TableHeaderContext.Provider value={contextValue}>
            <thead
                className={tableHeaderStyle({ class: className })}
                ref={ref}
                {...props}
            />
        </TableHeaderContext.Provider>
    );
});

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentProps<'tbody'>
>(function TableBody({ className, ...props }, ref) {
    return (
        <tbody
            className={tableBodyStyle({ class: className })}
            ref={ref}
            {...props}
        />
    );
});

const TableFooter = React.forwardRef<
    HTMLTableSectionElement,
    React.ComponentProps<'tfoot'>
>(function TableFooter({ className, ...props }, ref) {
    const contextValue = useMemo(() => {
        return {
            isFooterRow: true,
        };
    }, []);
    return (
        <TableFooterContext.Provider value={contextValue}>
            <tfoot
                className={tableFooterStyle({ class: className })}
                ref={ref}
                {...props}
            />
        </TableFooterContext.Provider>
    );
});

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ComponentProps<'th'>
>(function TableHead({ className, ...props }, ref) {
    return (
        <th
            className={tableHeadStyle({ class: className })}
            ref={ref}
            {...props}
        />
    );
});

const TableRow = React.forwardRef<
    HTMLTableRowElement,
    React.ComponentProps<'tr'>
>(function TableRow({ className, ...props }, ref) {
    const { isHeaderRow } = useContext(TableHeaderContext);
    const { isFooterRow } = useContext(TableFooterContext);
    return (
        <tr
            className={tableRowStyleStyle({
                isHeaderRow,
                isFooterRow,
                class: className,
            })}
            ref={ref}
            {...props}
        />
    );
});

const TableData = React.forwardRef<
    HTMLTableCellElement,
    React.ComponentProps<'td'>
>(function TableData({ className, ...props }, ref) {
    return (
        <td
            className={tableDataStyle({ class: className })}
            ref={ref}
            {...props}
        />
    );
});

const TableCaption = React.forwardRef<
    HTMLTableCaptionElement,
    React.ComponentProps<'caption'>
>(function TableCaption({ className, ...props }, ref) {
    return (
        <caption
            className={tableCaptionStyle({ class: className })}
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
