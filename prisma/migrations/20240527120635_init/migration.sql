/*
  Warnings:

  - Made the column `price` on table `Item` required. This step will fail if there are existing NULL values in that column.
  - Made the column `purchasedAt` on table `Purchase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `createdAt` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "price" SET NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "purchasedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Review" ALTER COLUMN "createdAt" SET NOT NULL;
