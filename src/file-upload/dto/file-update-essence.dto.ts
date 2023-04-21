import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FileUpdateEssenceDto {

  @ApiProperty({example: 'profile', description: 'Имя таблицы, в которой используется файл'})
  @IsOptional()
  essenceTable?: string;

  @ApiProperty({example: '2', description: 'Идентификатор записи в таблице, к которой привязан файл'})
  @IsOptional()
  essenceId?: number;
}