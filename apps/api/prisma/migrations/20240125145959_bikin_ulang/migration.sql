/*
  Warnings:

  - You are about to drop the `tickettier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `tickettier` DROP FOREIGN KEY `TicketTier_eventId_fkey`;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `price` DOUBLE NULL;

-- DropTable
DROP TABLE `tickettier`;
