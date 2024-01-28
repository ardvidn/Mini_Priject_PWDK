/*
  Warnings:

  - Added the required column `totalPoin` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `totalPoin` DOUBLE NOT NULL;
