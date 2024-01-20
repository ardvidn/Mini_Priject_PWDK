-- AlterTable
ALTER TABLE `event` ADD COLUMN `sum_tier` INTEGER NULL DEFAULT 1,
    MODIFY `event_date` VARCHAR(191) NOT NULL;
