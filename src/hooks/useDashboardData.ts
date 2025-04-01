import { useGroceryStore, useReceiptStore } from '~store';
import { parseDate, sortActiveItems, sortReceipts } from '~utils/date';

export default function useDashboardData() {
    const receipts = useReceiptStore((state) => state.receipts);
    const groceryItems = useGroceryStore((state) => state.groceryItems);

    sortActiveItems(groceryItems);
    sortReceipts(receipts);

    const date = new Date();
    const month = date.getMonth();
    const year = date.getFullYear();

    const filteredGroceryItems = groceryItems.filter(
        (groceryItem) => groceryItem.isActive,
    );

    const filteredReceipts = receipts.filter(
        (receipt) =>
            parseDate(receipt.purchaseDate).getMonth() === month &&
            parseDate(receipt.purchaseDate).getFullYear() === year,
    );

    const expenseTotal = filteredReceipts
        .reduce((total, receipt) => total + Number(receipt.total), 0)
        .toFixed(2);

    return {
        filteredGroceryItems,
        filteredReceipts,
        expenseTotal,
    };
}
