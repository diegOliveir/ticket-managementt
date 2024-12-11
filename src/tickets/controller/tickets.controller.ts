import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TicketsService } from '../service/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Ticket } from '../entities/ticket.entity';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getAllTickets(): Ticket[] {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: string): Ticket | undefined {
    return this.ticketsService.getTicketById(+id);
  }

  @Post(':id')
  createTicket(@Param('id') id: string, @Body() createTicketDto: CreateTicketDto): Ticket {
    return this.ticketsService.createTicket(createTicketDto);
  }

  @Put(':id')
  updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Ticket | undefined {
    return this.ticketsService.updateTicket(+id, updateTicketDto);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: string): boolean {
    return this.ticketsService.deleteTicket(+id);
  }
}
