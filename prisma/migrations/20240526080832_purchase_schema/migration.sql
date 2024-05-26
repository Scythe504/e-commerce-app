/*
  Warnings:

  - Added the required column `image` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "image" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "itemId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ItemToPurchase" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_userEmail_key" ON "Purchase"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "_ItemToPurchase_AB_unique" ON "_ItemToPurchase"("A", "B");

-- CreateIndex
CREATE INDEX "_ItemToPurchase_B_index" ON "_ItemToPurchase"("B");

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPurchase" ADD CONSTRAINT "_ItemToPurchase_A_fkey" FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ItemToPurchase" ADD CONSTRAINT "_ItemToPurchase_B_fkey" FOREIGN KEY ("B") REFERENCES "Purchase"("id") ON DELETE CASCADE ON UPDATE CASCADE;
