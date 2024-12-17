-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `content` VARCHAR(191) NOT NULL,
    `ticketId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_ticketId_fkey` FOREIGN KEY (`ticketId`) REFERENCES `Tickets`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
