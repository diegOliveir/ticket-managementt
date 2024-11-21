import { Module } from '@nestjs/common';
import { TicketsService } from './service/tickets.service'; 
import { TicketsController } from './controller/tickets.controller'; 
import { PrismaService } from 'src/utils/prisma.service';
import { TicketDAO } from './dao/ticket-dao';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService, TicketDAO],
})
export class TicketsModule {}
