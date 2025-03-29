import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store';
import { GroceryItem } from '~types';

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
                set((state: GroceryState) => ({
                    groceryItems: [...state.groceryItems, item],
                }));
            },
            removeGroceryItem: (id: number) => {
                set((state: GroceryState) => ({
                    groceryItems: state.groceryItems.filter(
                        (item) => item.id !== id,
                    ),
                }));
            },
            updateGroceryItem: (
                groceryItemId: number,
                receiptId: number,
                updatedItem: GroceryItem,
            ) => {
                set((state: GroceryState) => {
                    const index = state.groceryItems.findIndex(
                        (item) =>
                            item.id === groceryItemId &&
                            item.receiptId === receiptId,
                    );
                    if (index !== -1) {
                        const updatedItems = [...state.groceryItems];
                        updatedItems[index] = updatedItem;
                        return { groceryItems: updatedItems };
                    }
                    return state;
                });
            },
            resetGroceryItems: () => set({ groceryItems: [] }),
        }),
        {
            name: 'grocery-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);
