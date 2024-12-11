-- AlterTable
ALTER TABLE `Tickets` ADD COLUMN `admin` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `user` VARCHAR(191) NOT NULL DEFAULT '0';

-- CreateTable
CREATE TABLE `administrador` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NULL,

    UNIQUE INDEX `administrador_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_user_fkey` FOREIGN KEY (`user`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tickets` ADD CONSTRAINT `Tickets_admin_fkey` FOREIGN KEY (`admin`) REFERENCES `administrador`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
