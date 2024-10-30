import { useLocalSearchParams } from 'expo-router';
import ReceiptForm from '~components/ReceiptForm/ReceiptForm';
import useReceipts from '~hooks/components/useReceipts';
import { useReceipt } from '~hooks/redux/useReceipt';

export default function ReceiptEditScreen() {
    const local = useLocalSearchParams();
    const { receipts } = useReceipt();
    const { handleUpdate, loading, error } = useReceipts();
    const { id } = local;
    const receipt = receipts.find((receipt) => Number(receipt.id) === Number(id));

    return receipt ? (
        <ReceiptForm initialValues={receipt} handleSubmit={handleUpdate} loading={loading} error={error} />
    ) : null;
}
