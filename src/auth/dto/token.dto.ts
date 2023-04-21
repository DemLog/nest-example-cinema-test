import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {

  @ApiProperty({example: 'fdfdg53e4tetrgh545g5e4tr54g', description: 'Токен'})
  token: string;
}