import {
    tokenStorage,
    useExpenseStore,
    useGroceryStore,
    useReceiptStore,
    useUserStore,
} from '~store';

export default function useResetData() {
    const { resetUser } = useUserStore();
    const { resetGroceryItems } = useGroceryStore();
    const { resetReceipts } = useReceiptStore();
    const { resetExpenses } = useExpenseStore();

    const resetData = () => {
        resetUser();
        resetGroceryItems();
        resetReceipts();
        resetExpenses();
        tokenStorage.delete('accessToken');
        tokenStorage.delete('refreshToken');
        tokenStorage.set('isAuthenticated', false);
    };
    return { resetData };
}
