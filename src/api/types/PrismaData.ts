import { GroceryItem as PrismaGroceryItem, Receipt as PrismaReceipt, User as PrismaUser } from '@prisma/client';

export type PrismaData = {
    data: PrismaGroceryItem | PrismaReceipt | PrismaUser | PrismaGroceryItem[] | PrismaReceipt[] | PrismaUser[];
};
