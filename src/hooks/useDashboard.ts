import useDashboardQuery from '~services/userService';
import { useExpenseStore } from '~store/expenseStore';
import { useGroceryStore } from '~store/groceryStore';
import { useReceiptStore } from '~store/receiptStore';

export default function useDashboard() {
    const { setGroceryItems } = useGroceryStore();
    const { setReceipts } = useReceiptStore();
    const { setExpenses } = useExpenseStore();
    const { data, error, isLoading, isPending, isError, isSuccess } =
        useDashboardQuery();

    const retrieveData = async () => {
        try {
            if (isSuccess && data) {
                const { groceryItems, receipts, expenses } = data.data;
                console.log('Retrieve', groceryItems);
                setGroceryItems(groceryItems || []);
                setReceipts(receipts || []);
                setExpenses(expenses || []);
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
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
