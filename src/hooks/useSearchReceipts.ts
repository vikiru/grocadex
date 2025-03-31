import { useEffect, useState } from 'react';
import { useReceiptStore } from '~store';

export default function useSearchReceipts() {
    const receipts = useReceiptStore((state) => state.receipts);
    const [filteredReceipts, setFilteredReceipts] = useState(receipts);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const filtered = receipts.filter((receipt) => {
            return (
                receipt.store.toLowerCase().includes(query.toLowerCase()) ||
                receipt.store === query
            );
        });
        setFilteredReceipts(filtered);
    }, [query, receipts]);

    return { filteredReceipts, query, setQuery };
}
