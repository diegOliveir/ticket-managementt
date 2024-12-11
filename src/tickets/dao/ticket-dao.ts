import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Tickets, Prisma } from '@prisma/client';

@Injectable()
export class TicketDAO {
  constructor(private readonly prisma: PrismaService) {}

  // Recupera todos os tickets
  async findAll(): Promise<Tickets[]> {
    return this.prisma.tickets.findMany();
  }

  // Recupera um ticket por ID
  async findById(id: string): Promise<Tickets | null> {
    return this.prisma.tickets.findUnique({
      where: { id },
    });
  }

  // Criação de um novo ticket
  async create(ticket: CreateTicketDto, userId: string, adminID: string): Promise<Tickets> {
    const createdTicket = await this.prisma.tickets.create({
      data: {
        nome: ticket.nome,
        admin_id: adminID,
        user_id: userId,
      },
    });
    return createdTicket;
  }

  // Atualiza um ticket existente
  async update(id: string, ticketData: Partial<CreateTicketDto>): Promise<Tickets | null> {
    const updatedTicket = await this.prisma.tickets.update({
      where: { id },
      data: ticketData,
    });
    return updatedTicket;
  }

  // Deleta um ticket pelo ID
  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.tickets.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
