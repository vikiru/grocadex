import { useEffect, useState } from 'react';
import { useGroceryStore, useReceiptStore } from '~store';
import { GroceryItem, Receipt } from '~types';
import { parseDate, sortActiveItems, sortReceipts } from '~utils/date';

export default function useDashboardData() {
    const receipts = useReceiptStore((state) => state.receipts);
    const groceryItems = useGroceryStore((state) => state.groceryItems);

    sortActiveItems(groceryItems);
    sortReceipts(receipts);

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const [filteredGroceryItems, setFilteredGroceryItems] = useState<
        GroceryItem[]
    >([]);
    const [filteredReceipts, setFilteredReceipts] = useState<Receipt[]>([]);
    const [expenseTotal, setExpenseTotal] = useState<number>(0);

    useEffect(() => {
        const filteredItems = groceryItems.filter(
            (groceryItem) => groceryItem.isActive,
        );

        const filteredReceiptsData = receipts.filter(
            (receipt) =>
                parseDate(receipt.purchaseDate).getMonth() === month &&
                parseDate(receipt.purchaseDate).getFullYear() === year,
        );

        const totalExpense = filteredReceiptsData.reduce(
            (total, receipt) => total + Number(receipt.total),
            0,
        );

        setFilteredGroceryItems(filteredItems);
        setFilteredReceipts(filteredReceiptsData);
        setExpenseTotal(totalExpense);
    }, [receipts, groceryItems, month, year]);

    return {
        filteredGroceryItems,
        filteredReceipts,
        expenseTotal,
    };
}
