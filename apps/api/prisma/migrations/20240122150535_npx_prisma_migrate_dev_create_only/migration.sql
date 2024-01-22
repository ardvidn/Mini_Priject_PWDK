/*
  Warnings:

  - Added the required column `useridid` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` ADD COLUMN `useridid` INTEGER NOT NULL;
