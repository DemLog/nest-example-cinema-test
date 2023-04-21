import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
  @ApiProperty({example: 'loginuser', description: 'Логин'})
  @IsNotEmpty()
  login: string;

  @ApiProperty({example: 'passworduser', description: 'Пароль'})
  @IsNotEmpty()
  password: string;
}