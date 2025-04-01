import { GroceryForm } from '~components';
import { Modal, ModalBackdrop, ModalContent } from '~components/ui';
import { GroceryItem } from '~types';

type GroceryItemModalProps = {
    isOpen: boolean;
    onClose: () => void;
    initialValues:
        | GroceryItem
        | Partial<GroceryItem>
        | Pick<
              GroceryItem,
              'name' | 'expiryDate' | 'quantity' | 'unitPrice' | 'totalPrice'
          >;
    onSubmit: (
        values:
            | GroceryItem
            | Pick<
                  GroceryItem,
                  | 'name'
                  | 'expiryDate'
                  | 'quantity'
                  | 'unitPrice'
                  | 'totalPrice'
              >,
    ) => Promise<void>;
    id?: number;
    receiptId?: number;
    userId: number;
};

export default function GroceryItemModal({
    isOpen,
    onClose,
    initialValues,
    onSubmit,
    id,
    receiptId,
    userId,
}: GroceryItemModalProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalBackdrop onClick={onClose} />
            <ModalContent>
                <GroceryForm
                    id={id}
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    receiptId={receiptId}
                    userId={userId}
                />
            </ModalContent>
        </Modal>
    );
}
