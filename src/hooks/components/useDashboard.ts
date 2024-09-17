import { useState } from 'react';
import { useGetData } from '~hooks/api/useGetData';
import { useActiveItem } from '~hooks/redux/useActiveItem';
import { useExpense } from '~hooks/redux/useExpense';
import { useReceipt } from '~hooks/redux/useReceipt';
import { RequestPayload } from '~types/RequestPayload';
import { constructExpenses } from '~utils/expense';

export function useDashboard() {
    const { updateActiveItem } = useActiveItem();
    const { setReceiptValues } = useReceipt();
    const { updateExpenses } = useExpense();
    const { getData } = useGetData();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const retrieveData = async () => {
        setLoading(true);
        setError(null);

        const payload: RequestPayload = {
            url: `http://10.0.0.168:3000/api/v1/users/dashboard`,
            data: [],
        };

        try {
            const response = await getData(payload);
            if (response?.status === 200) {
                const data = response?.data;
                const { groceryItems, receipts } = data.data;
                setReceiptValues(receipts);
                updateActiveItem(groceryItems);
                const expenses = constructExpenses(receipts);
                updateExpenses(expenses);
                return { success: true };
            } else {
                setError(new Error('Unable to retrieve user data.'));
            }
        } catch (error) {
            return { success: false };
        }
    };

    const handleDataRetrieval = async () => {
        await retrieveData();
    };

    return { retrieveData, handleDataRetrieval, loading, error };
}
