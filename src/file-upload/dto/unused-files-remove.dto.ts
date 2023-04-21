import { ApiProperty } from "@nestjs/swagger";

export class UnusedFilesRemoveDto {
  @ApiProperty({ example: '3', description: 'Количество удаленных файлов' })
  count: number;

  @ApiProperty({ example: 'Всего было удалено: 3 файл(ов)', description: 'Сообщение об удалении' })
  message: string;
}