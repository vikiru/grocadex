import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from '~store/zustandStorage';
import { Receipt } from '~types/Receipt';

type ReceiptState = {
    receipts: Receipt[];
    getReceipts: () => Receipt[];
    getReceiptById: (receiptId: number) => Receipt | undefined;
    getReceiptsByIds: (receiptIds: number[]) => Receipt[];
    getReceiptsByMonthYear: (month: number, year: number) => Receipt[];
    getReceiptsByYear: (year: number) => Receipt[];
    setReceipts: (receipts: Receipt[]) => void;
    addReceipt: (receipt: Receipt) => void;
    deleteReceipt: (receiptId: number) => void;
    updateReceipt: (receiptId: number, updatedReceipt: Receipt) => void;
    resetReceipts: () => void;
};

export const useReceiptStore = create<ReceiptState>()(
    persist(
        (set, get) => ({
            receipts: [],
            getReceipts: () => get().receipts,
            getReceiptById: (receiptId: number) =>
                get().receipts.find((receipt) => receipt.id === receiptId),
            getReceiptsByIds: (receiptIds: number[]) => {
                return get().receipts.filter((receipt) =>
                    receiptIds.includes(receipt.id),
                );
            },
            getReceiptsByMonthYear: (month: number, year: number) => {
                return get().receipts.filter((receipt) => {
                    const date = new Date(receipt.purchaseDate);
                    return (
                        date.getMonth() === month && date.getFullYear() === year
                    );
                });
            },
            getReceiptsByYear: (year: number) => {
                return get().receipts.filter((receipt) => {
                    const date = new Date(receipt.purchaseDate);
                    return date.getFullYear() === year;
                });
            },
            setReceipts: (receipts: Receipt[]) => set({ receipts: receipts }),
            addReceipt: (receipt: Receipt) =>
                set({ receipts: [...get().receipts, receipt] }),
            deleteReceipt: (receiptId: number) => {
                const currentReceipts = get().receipts;
                const updatedReceipts = currentReceipts.filter(
                    (receipt) => receipt.id !== receiptId,
                );
                if (updatedReceipts.length === currentReceipts.length) return;
                set({ receipts: updatedReceipts });
            },

            updateReceipt: (receiptId: number, updatedReceipt: Receipt) => {
                const currentReceipts = get().receipts;
                const receiptIndex = currentReceipts.findIndex(
                    (receipt) => receipt.id === receiptId,
                );
                if (receiptIndex === -1) return;
                const updatedReceipts = [...currentReceipts];
                updatedReceipts[receiptIndex] = updatedReceipt;
                set({ receipts: updatedReceipts });
            },

            resetReceipts: () => set({ receipts: [] }),
        }),
        {
            name: 'receipt-storage',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
);
