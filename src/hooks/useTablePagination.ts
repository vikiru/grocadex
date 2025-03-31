import { useState } from 'react';

export default function useTablePagination() {
    const [startIndex, setStartIndex] = useState(0);
    const [page, setPage] = useState(0);
    const pageSize = 5;

    const handleSkipToPage = (page: number) => {
        setStartIndex(page * pageSize);
        setPage(page);
    };

    const handleIncrementPage = (numPages: number) => {
        if (startIndex + pageSize < numPages * pageSize) {
            setStartIndex(startIndex + 5);
            setPage(page + 1);
        }
    };
    const handleDecrementPage = () => {
        if (startIndex - pageSize >= 0) {
            setStartIndex(startIndex - pageSize);
            setPage(page - 1);
        }
    };

    return {
        startIndex,
        page,
        pageSize,
        setStartIndex,
        setPage,
        handleSkipToPage,
        handleIncrementPage,
        handleDecrementPage,
    };
}
