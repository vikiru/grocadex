import GroceryCard from '~components/GroceryCard/GroceryCard';
import GroceryItemCard from '~components/GroceryItemCard/GroceryItemCard';
import { GroceryItem } from '~types/GroceryItem';

type CardProps = {
    variant: string;
    item: GroceryItem | Partial<GroceryItem>;
};

export default function Card({ variant, item }: CardProps) {
    switch (variant) {
        case 'detail':
            return <GroceryCard item={item} />;
        case 'compact':
            return <GroceryItemCard item={item} />;
        default:
            return <GroceryCard item={item} />;
    }
}
