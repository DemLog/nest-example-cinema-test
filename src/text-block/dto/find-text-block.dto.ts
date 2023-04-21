import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindTextBlockDto {
  @ApiProperty({example: 'main-group', description: 'Группа блока', required: false})
  @IsOptional()
  @IsNotEmpty()
  group: string;
}