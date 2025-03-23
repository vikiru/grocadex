import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store/zustandStorage';
import { GroceryItem } from '~types/GroceryItem';

type GroceryState = {
    groceryItems: GroceryItem[];
    getGroceryItems: () => GroceryItem[];
    getGroceryItemById: (id: number) => GroceryItem | undefined;
    setGroceryItems: (items: GroceryItem[]) => void;
    addGroceryItem: (item: GroceryItem) => void;
    removeGroceryItem: (id: number) => void;
    updateGroceryItem: (
        groceryItemId: number,
        receiptId: number,
        updatedItem: GroceryItem,
    ) => void;
    resetGroceryItems: () => void;
};

export const useGroceryStore = create<GroceryState>()(
    persist(
        (set, get) => ({
            groceryItems: [],
            getGroceryItems: () => get().groceryItems,
            getGroceryItemById: (id: number) =>
                get().groceryItems.find((item) => item.id === id),
            setGroceryItems: (items: GroceryItem[]) =>
                set({ groceryItems: items }),
            addGroceryItem: (item: GroceryItem) => {
                const currentItems = get().groceryItems;
                set({ groceryItems: [...currentItems, item] });
            },
            removeGroceryItem: (id: number) => {
                const currentItems = get().groceryItems;
                const updatedItems = currentItems.filter(
                    (item) => item.id !== id,
                );
                if (updatedItems.length === currentItems.length) {
                    return;
                }
                set({ groceryItems: updatedItems });
            },
            updateGroceryItem: (
                groceryItemId: number,
                receiptId: number,
                updatedItem: GroceryItem,
            ) => {
                const currentItems = get().groceryItems;
                const index = currentItems.findIndex(
                    (item) =>
                        item.id === groceryItemId &&
                        item.receiptId === receiptId,
                );
                if (index === -1) {
                    return;
                }
                const updatedItems = [...currentItems];
                updatedItems[index] = updatedItem;
                set({ groceryItems: updatedItems });
            },

            resetGroceryItems: () => set({ groceryItems: [] }),
        }),
        {
            name: 'grocery-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);
