/*
  Warnings:

  - You are about to drop the column `purchasedt` on the `Purchase` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "price" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchasedt",
ADD COLUMN     "purchasedAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "createdAt" DROP NOT NULL;
