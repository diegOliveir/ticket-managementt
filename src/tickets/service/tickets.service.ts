import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketDAO } from '../dao/ticket-dao';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';

@Injectable()
export class TicketsService {
  constructor(private readonly ticketDAO: TicketDAO) {}

  getAllTickets(): Ticket[] {
    return this.ticketDAO.findAll();
  }

  getTicketById(id: number): Ticket | undefined {
    return this.ticketDAO.findById(id);
  }

  createTicket(createTicketDto: CreateTicketDto): Ticket {
    return this.ticketDAO.create(createTicketDto);
  }

  updateTicket(id: number, updateTicketDto: UpdateTicketDto): Ticket | undefined {
    const ticket = this.ticketDAO.findById(id);
    if (!ticket) {
      throw new BadRequestException('Ticket não encontrado.');
    }
    if (ticket.status === 'closed' && updateTicketDto.status !== 'in_progress') {
      throw new BadRequestException('Tickets fechados não podem ser editados.');
    }
    return this.ticketDAO.update(id, updateTicketDto);
  }

  deleteTicket(id: number): boolean {
    return this.ticketDAO.delete(id);
  }
}
