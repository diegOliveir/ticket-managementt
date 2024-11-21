import { Injectable } from '@nestjs/common';
import { Ticket } from '../entities/ticket.entity';

@Injectable()
export class TicketDAO {
  private tickets: Ticket[] = [];
  private nextId = 1;

  findAll(): Ticket[] {
    return this.tickets;
  }

  findById(id: number): Ticket | undefined {
    return this.tickets.find(ticket => ticket.id === id);
  }

  create(ticket: Partial<Ticket>): Ticket {
    const newTicket: Ticket = {
      id: this.nextId++,
      title: ticket.title || '',
      description: ticket.description || '',
      status: ticket.status || 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.tickets.push(newTicket);
    return newTicket;
  }

  update(id: number, ticketData: Partial<Ticket>): Ticket | undefined {
    const ticket = this.findById(id);
    if (!ticket) return undefined;

    Object.assign(ticket, ticketData, { updatedAt: new Date() });
    return ticket;
  }

  delete(id: number): boolean {
    const index = this.tickets.findIndex(ticket => ticket.id === id);
    if (index === -1) return false;

    this.tickets.splice(index, 1);
    return true;
  }
}
