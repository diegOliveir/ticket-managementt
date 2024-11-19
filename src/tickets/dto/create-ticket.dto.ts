import { IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  nome: string;
}