import { useDashboardQuery } from '@/services';
import { useExpenseStore, useGroceryStore, useReceiptStore } from '@/store';

export default function useDashboard() {
    const { setGroceryItems } = useGroceryStore();
    const { setReceipts } = useReceiptStore();
    const { setExpenses } = useExpenseStore();
    const { data, error, isLoading, isPending, isError, isSuccess } = useDashboardQuery();

    const retrieveData = async () => {
        try {
            if (isSuccess && data) {
                const { groceryItems, receipts, expenses } = data.data;
                setGroceryItems(groceryItems || []);
                setReceipts(receipts || []);
                setExpenses(expenses || []);
            }
        } catch {
            console.error('Dashboard data retrieval failed.');
        }
    };

    return {
        data,
        error,
        isLoading,
        isPending,
        isError,
        isSuccess,
        retrieveData,
    };
}
