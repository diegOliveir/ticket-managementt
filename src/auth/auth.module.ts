import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { UserDAO } from 'src/user/dao/user-dao';
import { PrismaService } from 'src/utils/prisma.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  imports: [
    
  ],
  providers: [
    GoogleStrategy,
    AuthService,
    UserService,
    UserDAO,
    PrismaService,
    JwtService,
  ],
})
export class AuthModule {}
