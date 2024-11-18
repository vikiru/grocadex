import { GroceryCard, GroceryItemCard, ReceiptCard } from '~components/index';
import { GroceryItem, Receipt } from '~types/index';

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
