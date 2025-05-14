-- CreateTable
CREATE TABLE `Users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL DEFAULT 'Anonymous',
    `password` VARCHAR(191) NOT NULL,
    `authority` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_id_key`(`id`),
    UNIQUE INDEX `Users_email_key`(`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `BanUsers` (
    `id` VARCHAR(191) NOT NULL,
    `banEmail` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `BanUsers_id_key`(`id`),
    UNIQUE INDEX `BanUsers_banEmail_key`(`banEmail`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tasks` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `triggerId` VARCHAR(191) NOT NULL,
    `triggerData` JSON NOT NULL,
    `actionId` VARCHAR(191) NOT NULL,
    `actionData` JSON NOT NULL,

    UNIQUE INDEX `Tasks_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActionsAvailable` (
    `id` VARCHAR(191) NOT NULL,
    `toSend` JSON NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `serviceName` VARCHAR(191) NOT NULL,
    `func` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `ActionsAvailable_id_key`(`id`),
    UNIQUE INDEX `ActionsAvailable_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TriggersAvailable` (
    `id` VARCHAR(191) NOT NULL,
    `toSend` JSON NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `serviceName` VARCHAR(191) NOT NULL,
    `func` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TriggersAvailable_id_key`(`id`),
    UNIQUE INDEX `TriggersAvailable_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Services` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `logo` TEXT NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `oauth2url` VARCHAR(191) NOT NULL DEFAULT '',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Services_id_key`(`id`),
    UNIQUE INDEX `Services_name_key`(`name`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Oauth2Data` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `serviceName` VARCHAR(191) NOT NULL,
    `data` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Oauth2Data_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
