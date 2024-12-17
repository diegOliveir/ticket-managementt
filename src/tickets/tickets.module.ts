import { Module } from '@nestjs/common';
import { TicketsService } from './service/tickets.service'; 
import { TicketsController } from './controller/tickets.controller'; 
import { PrismaService } from 'src/utils/prisma.service';
import { TicketDAO } from './dao/ticket-dao';
import { UserDAO } from 'src/user/dao/user-dao';
import { EmailService } from 'src/utils/mail.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService, TicketDAO, UserDAO, EmailService],
})
export class TicketsModule {}
