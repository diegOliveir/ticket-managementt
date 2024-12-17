import { IsString, IsUUID, IsNotEmpty } from 'class-validator';

export class CreateTicketMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  ticketId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}


export class CreateTicketAdminMessageDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsUUID()
  ticketId: string;

  @IsNotEmpty()
  @IsUUID()
  adminId: string;
}
