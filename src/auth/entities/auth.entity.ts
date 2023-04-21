import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Profile } from "../../profile/entities/profile.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity('Auth')
export class Auth {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'loginuser', description: 'Логин'})
  @Column()
  login: string;

  @ApiProperty({example: 'passworduser', description: 'Пароль'})
  @Column()
  password: string;

  @Column({ default: 'user' })
  role: Role;

  @OneToOne(() => Profile, profile => profile.auth, {onDelete: 'CASCADE'})
  @JoinColumn()
  profile: Profile;
}