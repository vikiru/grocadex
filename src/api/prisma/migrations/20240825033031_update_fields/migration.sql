/*
  Warnings:

  - Changed the type of `purchaseDate` on the `GroceryItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `expiryDate` on the `GroceryItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `purchaseDate` on the `Receipt` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "GroceryItem" DROP COLUMN "purchaseDate",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL,
DROP COLUMN "expiryDate",
ADD COLUMN     "expiryDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Receipt" DROP COLUMN "purchaseDate",
ADD COLUMN     "purchaseDate" TIMESTAMP(3) NOT NULL;
