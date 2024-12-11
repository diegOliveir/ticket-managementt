import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly fileService: FilesService) {}


  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuid()}${extname(file.originalname)}`; 
          callback(null, uniqueSuffix);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('ticketId') ticketId: string,
    @Body('nome') nome: string,
  ) {
    if (!ticketId) {
      throw new BadRequestException('ticketId is required');
    }
  
    const fileUrl = `/uploads/${file.filename}`;
  
    const savedFile = await this.fileService.saveFileToTicket({
      nome: nome || file.originalname,
      url: fileUrl,
      ticketId,
    });
  
    return {
      message: 'File uploaded successfully',
      file: savedFile,
    };
  }
}
