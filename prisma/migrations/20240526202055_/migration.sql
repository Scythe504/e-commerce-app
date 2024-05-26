/*
  Warnings:

  - You are about to drop the column `itemId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `Purchase` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userEmail_fkey";

-- DropIndex
DROP INDEX "Purchase_userEmail_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "itemId",
DROP COLUMN "userEmail",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
