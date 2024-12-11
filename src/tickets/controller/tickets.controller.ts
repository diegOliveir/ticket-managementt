import { Controller, Get, Post, Put, Delete, Param, Body, BadRequestException } from '@nestjs/common';
import { TicketsService } from '../service/tickets.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { Ticket } from '../entities/ticket.entity';
import { Tickets } from '@prisma/client';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  getAllTickets():Promise<Tickets[]> {
    return this.ticketsService.getAllTickets();
  }

  @Get(':id')
  getTicketById(@Param('id') id: string): Promise<Tickets> | undefined {
    return this.ticketsService.getTicketById(id);
  }

  @Post(':id')
  createTicket(@Param('id') userId: string, @Body() createTicketDto: CreateTicketDto) {
    if (!userId) {
      throw new BadRequestException('userId is required');
    }
    return this.ticketsService.createTicket(createTicketDto, userId);
  }

  @Put(':id')
  updateTicket(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto): Promise<Tickets> {
    return this.ticketsService.updateTicket(id, updateTicketDto);
  }

  @Delete(':id')
  deleteTicket(@Param('id') id: string): Promise<boolean> {
    return this.ticketsService.deleteTicket(id);
  }
}
