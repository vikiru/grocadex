import { GroceryItem } from '@prisma/client';
import { prisma } from '../data';

export async function saveActiveItems(userId: number, receiptIds: number[]): Promise<void> {
    try {
        const newItems = await prisma.groceryItem.findMany({
            where: {
                receiptId: {
                    in: receiptIds,
                },
            },
        });

        await prisma.user.update({
            where: { id: userId },
            data: {
                activeItems: {
                    connect: newItems.map((item) => ({ id: item.id })),
                },
            },
        });

        console.log('Successfully updated active items for the user.');
    } catch (error) {
        console.error(`Error updating active items for user: ${error}`);
    }
}

export async function retrieveActiveItems(userId: number): Promise<GroceryItem[]> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { activeItems: true },
        });

        return user.activeItems;
    } catch (error) {
        console.error(`Error retrieving active items for user with id ${userId}: ${error}`);
        throw error;
    }
}

export async function retrieveActiveItemById(userId: number, activeItemId: number): Promise<GroceryItem | null> {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { activeItems: true },
        });
        const activeItem = user.activeItems.find((item) => item.id === activeItemId);
        return activeItem;
    } catch (error) {
        console.error(`Error retrieving active item with id ${activeItemId}: ${error}`);
        throw error;
    }
}

export async function removeActiveItems(userId: number, groceryItemIds: number | number[]): Promise<void> {
    try {
        const ids = Array.isArray(groceryItemIds) ? groceryItemIds : [groceryItemIds];

        await prisma.user.update({
            where: { id: userId },
            data: {
                activeItems: {
                    disconnect: ids.map((id) => ({ id })),
                },
            },
        });

        console.log(`Successfully removed ${ids.length} grocery item(s) from user ${userId}'s active items.`);
    } catch (error) {
        console.error(`Error removing active items from user ${userId}: ${error}`);
        throw error;
    }
}
