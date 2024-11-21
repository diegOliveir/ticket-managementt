import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
  @IsNotEmpty()
  @IsString()
  status: string;
}