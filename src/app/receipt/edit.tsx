import { useLocalSearchParams } from 'expo-router';
import ReceiptForm from '~components/ReceiptForm/ReceiptForm';
import { useReceipt } from '~hooks/redux/useReceipt';

export default function EditReceipt() {
    const local = useLocalSearchParams();
    const { receipts } = useReceipt();
    const { id } = local;
    const receipt = receipts.find((receipt) => Number(receipt.id) === Number(id));

    return receipt ? <ReceiptForm initialValues={receipt} /> : null;
}
