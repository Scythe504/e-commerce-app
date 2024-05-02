/*
  Warnings:

  - You are about to drop the `CartItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cartId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Made the column `purchaseId` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_cartId_fkey";

-- DropForeignKey
ALTER TABLE "CartItem" DROP CONSTRAINT "CartItem_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_purchaseId_fkey";

-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "cartId" TEXT NOT NULL,
ALTER COLUMN "purchaseId" SET NOT NULL;

-- DropTable
DROP TABLE "CartItem";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_purchaseId_fkey" FOREIGN KEY ("purchaseId") REFERENCES "Purchase"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
