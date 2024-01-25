/*
  Warnings:

  - Added the required column `commentBy` to the `Reviewandrating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reviewandrating` ADD COLUMN `commentBy` VARCHAR(191) NOT NULL;
