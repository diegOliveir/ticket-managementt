import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from '../dto/create-ticket.dto'; 
import { UpdateTicketDto } from '../dto/update-ticket.dto'; 
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private prisma: PrismaService){}
 
  create(createTicketDto: CreateTicketDto) {
    
    return this.prisma.tickets.create({
      data: {
        nome: 'Sergio Malandro'
      }
    })
  }

  findAll() {
    return this.prisma.tickets.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} ticket`;
  }

  update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
