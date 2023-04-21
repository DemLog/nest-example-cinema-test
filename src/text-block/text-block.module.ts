import { Module } from '@nestjs/common';
import { TextBlockController } from './text-block.controller';
import { TextBlockService } from './text-block.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { TextBlock } from "./entities/textBlock.entity";
import { FileUploadModule } from "../file-upload/file-upload.module";

@Module({
  imports: [
    // Импортируем TypeOrmModule, чтобы модуль мог использовать TextBlock сущность
    TypeOrmModule.forFeature([TextBlock]),
    // Импортируем FileUploadModule, чтобы модуль мог использовать сервисы и контроллеры для загрузки файлов
    FileUploadModule
  ],
  // Добавляем контроллеры
  controllers: [TextBlockController],
  // Добавляем сервисы
  providers: [TextBlockService]
})
export class TextBlockModule {}
