/*
  Warnings:

  - You are about to alter the column `goalValue` on the `Goal` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.
  - You are about to alter the column `value` on the `Operation` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "Goal" ALTER COLUMN "goalValue" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Operation" ALTER COLUMN "value" SET DATA TYPE DECIMAL(65,30);
