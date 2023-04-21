import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProfileDto {
  @ApiProperty({example: 'Василий', description: 'Имя'})
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({example: 'Пупкин', description: 'Фамилия'})
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({example: 'vasya@mail.com', description: 'E-Mail', required: false})
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({example: '25', description: 'Возраст'})
  age: number;

  @ApiProperty({example: '+78005553535', description: 'Телефон', required: false})
  @IsOptional()
  phone?: string;
}