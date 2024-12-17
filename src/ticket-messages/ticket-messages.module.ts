import { Module } from '@nestjs/common';
import { TicketMessagesService } from './ticket-messages.service';
import { TicketMessagesController } from './ticket-messages.controller';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [TicketMessagesController],
  providers: [TicketMessagesService, PrismaService],
})
export class TicketMessagesModule {}
