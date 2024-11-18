import { GroceryItem, Receipt } from '~types/index';

import GroceryCard from '~components/GroceryCard/GroceryCard';
import GroceryItemCard from '~components/GroceryItemCard/GroceryItemCard';
import ReceiptCard from '~components/ReceiptCard/ReceiptCard';

type CardProps = {
    variant: string;
    item?: GroceryItem | Partial<GroceryItem>;
    receipt?: Receipt | Partial<Receipt>;
};

export default function Card({ variant, item, receipt }: CardProps) {
    switch (variant) {
        case 'detail':
            return <GroceryCard item={item!} />;
        case 'compact':
            return <GroceryItemCard item={item!} />;
        case 'receipt':
            return <ReceiptCard receipt={receipt!} />;
        default:
            return <GroceryCard item={item!} />;
    }
}
