/*
  Warnings:

  - You are about to drop the column `purchasedAt` on the `Purchase` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "purchasedAt",
ADD COLUMN     "purchasedt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userId_key" ON "Purchase"("userId");
