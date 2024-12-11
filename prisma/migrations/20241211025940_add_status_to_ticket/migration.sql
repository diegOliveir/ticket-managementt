/*
  Warnings:

  - You are about to drop the column `admin` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the column `user` on the `Tickets` table. All the data in the column will be lost.
  - You are about to drop the `administrador` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `admin_id` to the `Tickets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Tickets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Tickets` DROP FOREIGN KEY `Tickets_admin_fkey`;

-- DropForeignKey
ALTER TABLE `Tickets` DROP FOREIGN KEY `Tickets_user_fkey`;

-- AlterTable
ALTER TABLE `Tickets` DROP COLUMN `admin`,
    DROP COLUMN `user`,
    ADD COLUMN `admin_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'open',
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `administrador`;

-- CreateTable
CREATE TABLE `Administrador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NULL,

    UNIQUE INDEX `Administrador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `Administrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
