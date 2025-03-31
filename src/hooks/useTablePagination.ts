import { useState } from 'react';

export default function useTablePagination() {
    const [startIndex, setStartIndex] = useState(0);
    const [page, setPage] = useState(0);

    const handleSkipToPage = (page: number, pageSize: number) => {
        setStartIndex(page * pageSize);
        setPage(page);
    };

    const handleIncrementPage = (numPages: number, pageSize: number) => {
        if (startIndex + pageSize < numPages * pageSize) {
            setStartIndex(startIndex + pageSize);
            setPage(page + 1);
        }
    };
    const handleDecrementPage = (pageSize: number) => {
        if (startIndex - pageSize >= 0) {
            setStartIndex(startIndex - pageSize);
            setPage(page - 1);
        }
    };

    return {
        startIndex,
        page,
        setStartIndex,
        setPage,
        handleSkipToPage,
        handleIncrementPage,
        handleDecrementPage,
    };
}
