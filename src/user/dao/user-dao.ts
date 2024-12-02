import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserDAO {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findById(id): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: { email },
    });
  }

  async create(user: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({
      data: user,
    });
  }

  async update(id, userData: UpdateUserDto): Promise<User | null> {
    return await this.prisma.user.update({
      where: { id },
      data: userData,
    });
  }

  async delete(id): Promise<boolean> {
    try {
      await this.prisma.user.delete({
        where: { id },
      });
      return true;
    } catch (error) {
      console.error('Delete failed:', error);
      return false;
    }
  }
}
