import { useEffect, useState } from 'react';
import { useGroceryStore } from '~store';
import { GroceryItem } from '~types';

export default function useSearchReceipts() {
    const groceries = useGroceryStore((state) => state.groceryItems);
    const [filteredGroceries, setFilteredGroceries] = useState(groceries);
    const [query, setQuery] = useState('');

    useEffect(() => {
        const filtered = groceries.filter((grocery: GroceryItem) => {
            return (
                grocery.name.toLowerCase().includes(query.toLowerCase()) ||
                grocery.name === query
            );
        });
        setFilteredGroceries(filtered);
    }, [query, groceries]);

    return { filteredGroceries, query, setQuery };
}
