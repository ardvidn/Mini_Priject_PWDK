/*
  Warnings:

  - You are about to drop the `samples` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `samples`;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `referral` VARCHAR(191) NOT NULL,
    `phone_num` VARCHAR(191) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'user',
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_referral_key`(`referral`),
    UNIQUE INDEX `User_phone_num_key`(`phone_num`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
