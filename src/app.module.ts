import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import googleAuthConfig from './auth/config/google-auth-config';
import { JwtModule } from '@nestjs/jwt';

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
  ],
  controllers: [], // Adicione seus controllers aqui, se necessário
  providers: [], // Adicione seus providers aqui, se necessário
})
export class AppModule {}