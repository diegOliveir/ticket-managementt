import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDAO } from './dao/user-dao';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UserDAO, PrismaService],
  exports:[UserService]
})
export class UserModule {}
