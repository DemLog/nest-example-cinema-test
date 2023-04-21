import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { TextBlock } from "./entities/textBlock.entity";
import { FindTextBlockDto } from "./dto/find-text-block.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TextBlockDto } from "./dto/text-block.dto";
import { TextBlockUpdateDto } from "./dto/text-block-update.dto";

@Injectable()
export class TextBlockService {
  constructor(@InjectRepository(TextBlock) private textBlockRepository: Repository<TextBlock>) {}

  /**
   * Создать новый текстовый блок
   * @param textBlockData Данные для создания нового текстового блока
   * @returns Созданный текстовый блок
   */
  async create(textBlockData: TextBlockDto): Promise<TextBlock> {
    const textBlock = new TextBlock();
    Object.assign(textBlock, textBlockData);
    return this.textBlockRepository.save(textBlock);
  }

  /**
   * Получить все текстовые блоки
   * @returns Список текстовых блоков
   */
  async findAll(): Promise<TextBlock[]> {
    return this.textBlockRepository.find();
  }

  /**
   * Получить текстовый блок по идентификатору
   * @param id Идентификатор текстового блока
   * @returns Текстовый блок
   */
  async findOneById(id: number): Promise<TextBlock> {
    return this.textBlockRepository.findOne({where: {id}})
  }

  /**
   * Получить все текстовые блоки по группе
   * @param findTextBlockData Данные для поиска текстовых блоков по группе
   * @returns Список текстовых блоков
   */
  async findAllByGroup(findTextBlockData: FindTextBlockDto): Promise<TextBlock[]> {
    return this.textBlockRepository.find({where: { group: findTextBlockData.group}})
  }

  /**
   * Обновить существующий текстовый блок
   * @param id Идентификатор обновляемого текстового блока
   * @param textBlockData Данные для обновления текстового блока
   * @returns Ничего не возвращает
   */
  async update(id: number, textBlockData: TextBlockUpdateDto): Promise<void> {
    await this.checkTextBlock(id);
    await this.textBlockRepository.update(id, textBlockData);
  }

  /**
   * Удалить текстовый блок по идентификатору
   * @param id Идентификатор удаляемого текстового блока
   * @returns Ничего не возвращает
   */
  async remove(id: number): Promise<void> {
    await this.checkTextBlock(id);
    await this.textBlockRepository.delete(id);
  }

  /**
   * Проверить, существует ли текстовый блок с указанным идентификатором
   * @param id Идентификатор текстового блока для проверки
   * @returns Истина, если текстовый блок существует, иначе выбрасывает исключение
   */
  private async checkTextBlock(id: number): Promise<boolean> {
    const textBlock = await this.findOneById(id);
    if (!textBlock) {
      throw new HttpException('Текстовый блок не найден.', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
