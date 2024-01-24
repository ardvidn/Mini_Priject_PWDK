/*
  Warnings:

  - Added the required column `usedBy` to the `Poin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poin` ADD COLUMN `usedBy` VARCHAR(191) NOT NULL;
