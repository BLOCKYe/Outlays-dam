/*
  Warnings:

  - Added the required column `reachedDate` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "reachedDate" TEXT NOT NULL;
