import { BadRequestException, Injectable } from '@nestjs/common';
import { TicketDAO } from '../dao/ticket-dao';
import { Ticket } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { UpdateTicketDto } from '../dto/update-ticket.dto';
import { UserDAO } from 'src/user/dao/user-dao';
import { Tickets } from '@prisma/client';

@Injectable()
export class TicketsService {
  constructor(
    private readonly ticketDAO: TicketDAO,
    private readonly userDAO: UserDAO
  ) {}

  async getAllTickets(): Promise<Tickets[]> {
    return await this.ticketDAO.findAll();
  }

  async getTicketById(id: string): Promise<Tickets> | undefined {
    return this.ticketDAO.findById(id);
  }

  async createTicket(createTicketDto: CreateTicketDto, userId: string) {
    try{
      const user = await this.userDAO.findById(userId);
      if (!user) {
        throw new BadRequestException('Usuário não encontrado.');
      }
      const admins = await this.userDAO.findAllAdminsWithTickets();
      if (!admins) {
        throw new BadRequestException('Não há administradores disponíveis.');
      }
      admins.sort((a, b) => a.Tickets.length - b.Tickets.length);
      const adminId = admins[0].id;
      return this.ticketDAO.create(createTicketDto, userId, adminId);

    }catch(e){
      throw new BadRequestException(e.message);
    }
  }

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto): Promise<Tickets> | undefined {
    const ticket = await this.ticketDAO.findById(id);
    if (!ticket) {
      throw new BadRequestException('Ticket não encontrado.');
    }
    if (ticket.status === 'closed' && updateTicketDto.status !== 'in_progress') {
      throw new BadRequestException('Tickets fechados não podem ser editados.');
    }
    return this.ticketDAO.update(id, updateTicketDto);
  }

  async deleteTicket(id: string): Promise<boolean> {
    return await this.ticketDAO.delete(id);
  }
}
