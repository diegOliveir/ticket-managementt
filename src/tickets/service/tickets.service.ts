import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service'; 
import { CreateTicketDto } from '../dto/create-ticket.dto'; 
import { UpdateTicketDto } from '../dto/update-ticket.dto'; 

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.prisma.tickets.create({ data: createTicketDto });
  }

  async findAll() {
    return this.prisma.tickets.findMany();
  }

  async findOne(id: string) {
    const ticket = await this.prisma.tickets.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.prisma.tickets.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.tickets.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: string) {
    const ticket = await this.prisma.tickets.findUnique({ where: { id } });
    if (!ticket) {
      throw new NotFoundException(`Ticket with ID ${id} not found`);
    }

    return this.prisma.tickets.delete({ where: { id } });
  }
}
