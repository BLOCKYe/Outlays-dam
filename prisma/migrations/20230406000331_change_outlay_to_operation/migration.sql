/*
  Warnings:

  - You are about to drop the `Outlay` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CategoryToOutlay` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Outlay" DROP CONSTRAINT "Outlay_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOutlay" DROP CONSTRAINT "_CategoryToOutlay_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToOutlay" DROP CONSTRAINT "_CategoryToOutlay_B_fkey";

-- DropTable
DROP TABLE "Outlay";

-- DropTable
DROP TABLE "_CategoryToOutlay";

-- CreateTable
CREATE TABLE "Operation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "Operation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToOperation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Operation_id_key" ON "Operation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToOperation_AB_unique" ON "_CategoryToOperation"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToOperation_B_index" ON "_CategoryToOperation"("B");

-- AddForeignKey
ALTER TABLE "Operation" ADD CONSTRAINT "Operation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToOperation" ADD CONSTRAINT "_CategoryToOperation_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToOperation" ADD CONSTRAINT "_CategoryToOperation_B_fkey" FOREIGN KEY ("B") REFERENCES "Operation"("id") ON DELETE CASCADE ON UPDATE CASCADE;
