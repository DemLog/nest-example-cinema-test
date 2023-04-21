import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTextBlockDto {
  @ApiProperty({example: 'main-hero-text', description: 'Уникальное имя блока'})
  @IsNotEmpty()
  uniqueName: string;

  @ApiProperty({example: 'Главный блок', description: 'Название блока'})
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'File content' })
  @IsOptional()
  image: Express.Multer.File;

  @ApiProperty({example: 'Длинный какой-то текст...', description: 'Текст блока'})
  @IsNotEmpty()
  text: string;

  @ApiProperty({example: 'main-group', description: 'Группа блока'})
  @IsNotEmpty()
  group: string;
}