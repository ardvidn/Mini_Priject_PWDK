/*
  Warnings:

  - You are about to drop the column `name_tier` on the `tickettier` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `tickettier` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - Added the required column `nameTier` to the `TicketTier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tickettier` DROP COLUMN `name_tier`,
    ADD COLUMN `nameTier` VARCHAR(191) NOT NULL,
    MODIFY `price` DOUBLE NOT NULL;
