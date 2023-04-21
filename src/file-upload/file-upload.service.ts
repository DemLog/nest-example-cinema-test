import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { LessThan, Repository } from "typeorm";
import { File } from "./entities/file.entity";
import { FileUploadDto } from "./dto/file-upload.dto";
import * as uuid from 'uuid';
import { FileUpdateEssenceDto } from "./dto/file-update-essence.dto";
import * as path from "path";
import * as fs from "fs";
import { UnusedFilesRemoveDto } from "./dto/unused-files-remove.dto";

@Injectable()
export class FileUploadService {
  constructor(@InjectRepository(File) private fileRepository: Repository<File>) {}

  /**
   * Создает новый файл в хранилище.
   * @param fileUpload - данные о файле, переданные клиентом
   * @returns - созданный файл
   */
  async create(fileUpload: FileUploadDto): Promise<File> {
    const { originalname, mimetype, buffer } = fileUpload.file;

    const file = new File();
    file.filename = uuid.v4() + '.' + originalname.split('.').pop();
    file.originalname = originalname;
    file.mimetype = mimetype;
    file.size = buffer.length;
    file.createdAt = new Date();

    // Создать папку для сохранения файлов, если ее нет
    const uploadDir = path.join(__dirname, '..', 'file-upload', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, file.filename);
    fs.writeFileSync(filePath, buffer);

    return this.fileRepository.save(file);
  }

  /**
   * Обновляет метаданные файла.
   * @param id - идентификатор файла
   * @param fileEssenceData - данные для обновления метаданных файла
   * @returns - обновленный файл
   */
  async updateEssence(id: number, fileEssenceData: FileUpdateEssenceDto): Promise<File> {
    const file: File = await this.fileRepository.findOne({where: {id}});
    file.essenceTable = fileEssenceData.essenceTable;
    file.essenceId = fileEssenceData.essenceId;
    await this.fileRepository.update(id, fileEssenceData)
    return file;
  }

  /**
   * Удаляет все файлы, которые не используются в какой-либо таблице и были созданы более часа назад.
   * @returns - объект с информацией о количестве удаленных файлов
   */
  async deleteUnusedFiles(): Promise<UnusedFilesRemoveDto> {
    const files = await this.fileRepository.find({
      where: {
        essenceId: null,
        createdAt: LessThan(new Date(new Date().getTime() - 60 * 60 * 1000)),
      },
    });
    for (const file of files) {
      await this.removeByFileName(file.filename);
    }

    return {count: files.length, message: `Всего было удалено: ${files.length} файл(ов)`}
  }

  /**
   * Удаляет файл из базы данных и с диска по имени файла.
   * @param fileName - название файла
   * @returns - ничего не возвращает
   */
  async removeByFileName(fileName: string): Promise<void> {
    const file = await this.fileRepository.findOne({ where: { filename: fileName} });
    if (file) {
      await this.fileRepository.delete(file.id);
      await this.deleteFileFromDisk(fileName);
    }
  }

  /**
   * Удаляет файл с диска по указанному имени файла.
   * @param fileName - название файла
   * @returns - ничего не возвращает
   */
  private async deleteFileFromDisk(fileName: string): Promise<void> {
    try {
      const filePath = path.join(__dirname, '..', 'file-upload', 'uploads', fileName);
      await fs.promises.unlink(filePath); // удаляем файл по указанному пути
    } catch (error) {
      // обработка ошибок, если удаление файла не удалось
      throw new Error(`Ошибка при удалении файла: ${error.message}`);
    }
  }
}