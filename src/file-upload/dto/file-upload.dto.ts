import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class FileUploadDto {
  @ApiProperty({ type: 'string', format: 'binary', description: 'File content' })
  @IsNotEmpty()
  file: Express.Multer.File;
}