import 'module-alias/register';
import { prisma } from '@/api/data/';
import { groceries } from '@/api/prisma/seed/data/groceries';
import { receipts } from '@/api/prisma/seed/data/receipt';
import { users } from '@/api/prisma/seed/data/user';
import { hashPassword } from '@/api/utils/hashPassword';

async function seedReceiptData(userId: number) {
    receipts.forEach(async (receipt) => {
        receipt.userId = userId;
        const newReceipt = await prisma.receipt.create({
            data: receipt,
        });
        const id = newReceipt.id;

        groceries.forEach(async (grocery) => {
            grocery.userId = userId;
            grocery.receiptId = id;
            grocery.purchaseDate = newReceipt.purchaseDate;
            await prisma.groceryItem.create({
                data: grocery,
            });
        });
    });
}

async function seedUserData() {
    users.forEach(async (user) => {
        const hashedPassword = await hashPassword(user.password);
        const newUser = await prisma.user.create({
            data: {
                ...user,
                password: hashedPassword,
            },
        });
        const id = newUser.id;
        await seedReceiptData(id);
    });
}

seedUserData();
