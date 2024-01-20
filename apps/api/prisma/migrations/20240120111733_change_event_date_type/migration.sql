/*
  Warnings:

  - You are about to alter the column `event_date` on the `event` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `event_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
