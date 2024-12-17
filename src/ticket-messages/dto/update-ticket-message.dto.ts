import { IsString, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketMessageDto } from './create-ticket-message.dto';

export class UpdateTicketMessageDto extends PartialType(CreateTicketMessageDto) {
  @IsOptional()
  @IsString()
  content?: string;
}


export class UpdateMessageAdminDto {
  @IsOptional()
  @IsString()
  content?: string;
}

