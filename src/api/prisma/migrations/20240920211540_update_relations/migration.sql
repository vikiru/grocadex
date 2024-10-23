-- DropForeignKey
ALTER TABLE "GroceryItem" DROP CONSTRAINT "GroceryItem_receiptId_fkey";

-- DropForeignKey
ALTER TABLE "GroceryItem" DROP CONSTRAINT "GroceryItem_userId_fkey";

-- AlterTable
ALTER TABLE "GroceryItem" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "GroceryItem" ADD CONSTRAINT "GroceryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroceryItem" ADD CONSTRAINT "GroceryItem_receiptId_fkey" FOREIGN KEY ("receiptId") REFERENCES "Receipt"("id") ON DELETE CASCADE ON UPDATE CASCADE;
