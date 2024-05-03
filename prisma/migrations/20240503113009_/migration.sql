/*
  Warnings:

  - A unique constraint covering the columns `[id,cartId]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_cartId_fkey";

-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "cartId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_cartId_key" ON "Item"("id", "cartId");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE SET NULL ON UPDATE CASCADE;
