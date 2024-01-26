/*
  Warnings:

  - Made the column `price` on table `event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `price` DOUBLE NOT NULL;
