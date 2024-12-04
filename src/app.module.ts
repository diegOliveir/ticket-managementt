import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import googleAuthConfig from './auth/config/google-auth-config';

@Module({
  imports: [
    TicketsModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [googleAuthConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
