import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('File')
export class File {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Уникальный идентификатор файла' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Имя файла' })
  filename: string;

  @Column()
  @ApiProperty({ description: 'Оригинальное имя файла' })
  originalname: string;

  @Column()
  @ApiProperty({ description: 'MIME-тип файла' })
  mimetype: string;

  @Column()
  @ApiProperty({ description: 'Размер файла в байтах' })
  size: number;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Дата создания файла', example: '2023-04-03T12:34:56.789Z' })
  createdAt?: Date;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Имя таблицы, в которой используется файл' })
  essenceTable?: string;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Идентификатор записи в таблице, к которой привязан файл' })
  essenceId?: number;
}