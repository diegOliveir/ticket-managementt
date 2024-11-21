import { Module } from '@nestjs/common';
import { TicketsModule } from './tickets/tickets.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [TicketsModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
