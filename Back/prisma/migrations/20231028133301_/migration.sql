/*
  Warnings:

  - You are about to drop the column `availability` on the `Services` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ActionsAvailable` ADD COLUMN `availability` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Services` DROP COLUMN `availability`;

-- AlterTable
ALTER TABLE `TriggersAvailable` ADD COLUMN `availability` BOOLEAN NOT NULL DEFAULT true;
