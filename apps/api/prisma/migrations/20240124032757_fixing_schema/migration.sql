/*
  Warnings:

  - You are about to drop the column `eventId` on the `categoryevent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `categoryevent` DROP FOREIGN KEY `CategoryEvent_eventId_fkey`;

-- AlterTable
ALTER TABLE `categoryevent` DROP COLUMN `eventId`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `category_event` VARCHAR(191) NOT NULL DEFAULT 'umum';
