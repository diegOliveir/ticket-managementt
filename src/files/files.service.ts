import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from 'src/utils/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  findAll() {
    this.prisma.files.findMany();
  }

  async saveFileToTicket(data: { nome: string; url: string; ticketId: string }) {

    const ticket = await this.prisma.tickets.findUnique({
      where: { id: data.ticketId },
    });
  
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }
  
    // Salva o arquivo associado ao ticket
    return this.prisma.files.create({
      data: {
        nome: data.nome,
        url: data.url,
        ticketId: data.ticketId,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
