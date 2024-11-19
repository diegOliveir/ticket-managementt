import { Module } from '@nestjs/common';
import { TicketsService } from './service/tickets.service'; 
import { TicketsController } from './controller/tickets.controller'; 

@Module({
  controllers: [TicketsController],
  providers: [TicketsService],
})
export class TicketsModule {}
