import { Injectable } from '@nestjs/common';
import {
  CreateTicketAdminMessageDto,
  CreateTicketMessageDto,
} from './dto/create-ticket-message.dto';
import { UpdateTicketMessageDto } from './dto/update-ticket-message.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class TicketMessagesService {
  constructor(private prisma: PrismaService) {}
  create(createTicketMessageDto: CreateTicketMessageDto) {
    try {
      return this.prisma.message.create({
        data: {
          ticketId: createTicketMessageDto.ticketId,
          userId: createTicketMessageDto.userId,
          content: createTicketMessageDto.content,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  createAdmin(createTicketMessageDto: CreateTicketAdminMessageDto) {
    try {
      return this.prisma.messageAdmin.create({
        data: {
          ticketId: createTicketMessageDto.ticketId,
          adminId: createTicketMessageDto.adminId,
          content: createTicketMessageDto.content,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  findAll() {}

  async findOne(id: string) {
    const [messages, messagesAdmin, files] = await Promise.all([
      this.prisma.message.findMany({
        where: { ticketId: id },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.messageAdmin.findMany({
        where: { ticketId: id },
        orderBy: { createdAt: 'asc' },
      }),
      this.prisma.files.findMany({
        where: { ticketId: id },
        orderBy: { createdAt: 'asc' },
      }),
    ]);
  
    const chat = [
      ...messages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        sender: 'user',
        senderId: msg.userId,
        createdAt: msg.createdAt,
      })),
      ...messagesAdmin.map((msgAdmin) => ({
        id: msgAdmin.id,
        content: msgAdmin.content,
        sender: 'admin',
        senderId: msgAdmin.adminId,
        createdAt: msgAdmin.createdAt,
      })),
    ];
  
    chat.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  
    return {
      ticketId: id,
      messages: chat,
      files: files.map((file) => ({
        id: file.id,
        name: file.nome,
        url: file.url,
        uploadedAt: file.createdAt,
      })),
    };
  }

  update(id: number, updateTicketMessageDto: UpdateTicketMessageDto) {
    return `This action updates a #${id} ticketMessage`;
  }

  remove(id: number) {
    return `This action removes a #${id} ticketMessage`;
  }
}
