/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Event` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Event_userId_key` ON `Event`(`userId`);
