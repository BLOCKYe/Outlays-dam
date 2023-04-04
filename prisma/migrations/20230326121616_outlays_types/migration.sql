/*
  Warnings:

  - Added the required column `type` to the `Outlay` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Outlay" ADD COLUMN     "type" TEXT NOT NULL;
