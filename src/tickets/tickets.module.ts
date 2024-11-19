import { Module } from '@nestjs/common';
import { TicketsService } from './service/tickets.service'; 
import { TicketsController } from './controller/tickets.controller'; 
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [TicketsController],
  providers: [TicketsService, PrismaService],
})
export class TicketsModule {}
