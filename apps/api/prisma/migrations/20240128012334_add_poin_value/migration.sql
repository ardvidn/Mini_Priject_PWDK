/*
  Warnings:

  - Added the required column `poinNum` to the `Poin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `poin` ADD COLUMN `poinNum` DOUBLE NOT NULL;
