-- AlterTable
ALTER TABLE "GroceryItem" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Expense_userId_month_year_idx" ON "Expense"("userId", "month", "year");

-- CreateIndex
CREATE UNIQUE INDEX "Expense_userId_month_year_key" ON "Expense"("userId", "month", "year");

-- CreateIndex
CREATE INDEX "GroceryItem_receiptId_idx" ON "GroceryItem"("receiptId");

-- CreateIndex
CREATE INDEX "GroceryItem_userId_idx" ON "GroceryItem"("userId");

-- CreateIndex
CREATE INDEX "GroceryItem_isActive_idx" ON "GroceryItem"("isActive");

-- CreateIndex
CREATE INDEX "Receipt_userId_idx" ON "Receipt"("userId");

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
