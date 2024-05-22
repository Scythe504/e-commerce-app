/*
  Warnings:

  - You are about to drop the column `cartId` on the `Item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `Item` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_cartId_fkey";

-- DropIndex
DROP INDEX "Item_id_cartId_key";

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "cartId";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "itemId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartToItem" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_reviewerId_key" ON "Review"("reviewerId");

-- CreateIndex
CREATE UNIQUE INDEX "_CartToItem_AB_unique" ON "_CartToItem"("A", "B");

-- CreateIndex
CREATE INDEX "_CartToItem_B_index" ON "_CartToItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Item_id_key" ON "Item"("id");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToItem" ADD CONSTRAINT "_CartToItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartToItem" ADD CONSTRAINT "_CartToItem_B_fkey" FOREIGN KEY ("B") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
