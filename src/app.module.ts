import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleAuthConfig from './auth/config/google-auth-config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { JwtModule } from '@nestjs/jwt';
import { FilesModule } from './files/files.module';
import { join } from 'path';
import { TicketMessagesModule } from './ticket-messages/ticket-messages.module';

@Module({
  imports: [
    TicketsModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleAuthConfig],
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '8h' },
        };
      },
      inject: [ConfigService],
    }),
    FilesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
    TicketMessagesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
