import React from 'react';
import GroceryModal from '../../components/GroceryModal/GroceryModal';

export default function NewGrocery() {
    return <GroceryModal visible={true} onDismiss={() => {}} onSubmit={() => {}} />;
}
