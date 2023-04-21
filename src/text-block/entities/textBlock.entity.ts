import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";

@Entity('TextBlock')
export class TextBlock {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({example: 'main-hero-text', description: 'Уникальное имя блока'})
  @Column()
  uniqueName: string;

  @ApiProperty({example: 'Главный блок', description: 'Название блока'})
  @Column()
  title: string;

  @ApiProperty({example: 'test.jpg', description: 'Изображение'})
  @Column({nullable: true})
  image: string;

  @ApiProperty({example: 'Длинный какой-то текст...', description: 'Текст блока'})
  @Column()
  text: string;

  @ApiProperty({example: 'main-group', description: 'Группа блока'})
  @Column()
  group: string;
}