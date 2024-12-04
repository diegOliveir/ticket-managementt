import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserDAO } from 'src/user/dao/user-dao';
import { PrismaService } from 'src/utils/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [GoogleStrategy, AuthService, UserService, UserDAO, PrismaService]})
export class AuthModule {
}
