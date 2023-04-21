import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Auth } from "../../auth/entities/auth.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('Profile')
export class Profile {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'Василий', description: 'Имя'})
  @Column()
  firstName: string;

  @ApiProperty({example: 'Пупкин', description: 'Фамилия'})
  @Column()
  lastName: string;

  @ApiProperty({example: 'vasya@mail.com', description: 'E-Mail'})
  @Column()
  email: string;

  @ApiProperty({example: '25', description: 'Возраст'})
  @Column()
  age: number;

  @ApiProperty({example: '+78005553535', description: 'Телефон'})
  @Column()
  phone: string;

  @OneToOne(() => Auth, auth => auth.profile, { onDelete: 'CASCADE' })
  auth: Auth;
}