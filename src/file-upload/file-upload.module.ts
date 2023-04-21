import { Module } from "@nestjs/common";
import { FileUploadController } from "./file-upload.controller";
import { FileUploadService } from "./file-upload.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { File } from "./entities/file.entity";

@Module({
  // Импортируем модуль TypeOrm и передаем сущность File
  imports: [
    TypeOrmModule.forFeature([File]),
  ],
  // Определяем контроллер
  controllers: [FileUploadController],
  // Определяем сервис
  providers: [FileUploadService],
  // Экспортируем сервис для использования в других модулях
  exports: [FileUploadService],
})
export class FileUploadModule {}