/*
  Warnings:

  - You are about to drop the column `category_event` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categoryevent` ADD COLUMN `eventId` INTEGER NULL;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `category_event`;

-- AddForeignKey
ALTER TABLE `CategoryEvent` ADD CONSTRAINT `CategoryEvent_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
