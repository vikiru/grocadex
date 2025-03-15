import ReceiptForm from '~components/ReceiptForm/ReceiptForm';
import useReceipts from '~hooks/components/useReceipts';
import { useReceipt } from '~hooks/redux';

export default function ReceiptEditScreen({ route }: any) {
    const { receipts } = useReceipt();
    const { handleUpdate, loading, error } = useReceipts();
    const { id } = route.params;
    const receipt = receipts.find(
        (receipt) => Number(receipt.id) === Number(id),
    );

    return receipt ? (
        <ReceiptForm
            error={error}
            handleSubmit={handleUpdate}
            initialValues={receipt}
            loading={loading}
        />
    ) : null;
}
