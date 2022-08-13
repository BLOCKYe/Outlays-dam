/*
  Warnings:

  - You are about to drop the column `outlayId` on the `Category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_outlayId_fkey";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "outlayId";

-- CreateTable
CREATE TABLE "_CategoryToOutlay" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToOutlay_AB_unique" ON "_CategoryToOutlay"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToOutlay_B_index" ON "_CategoryToOutlay"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToOutlay" ADD CONSTRAINT "_CategoryToOutlay_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToOutlay" ADD CONSTRAINT "_CategoryToOutlay_B_fkey" FOREIGN KEY ("B") REFERENCES "Outlay"("id") ON DELETE CASCADE ON UPDATE CASCADE;
