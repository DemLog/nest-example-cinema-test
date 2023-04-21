import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { Repository } from "typeorm";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>
  ) {}

  /**
   * Создает профиль пользователя.
   * @param profileData Данные для создания профиля.
   * @returns Возвращает созданный профиль пользователя.
   */
  async create(profileData: CreateProfileDto): Promise<Profile> {
    const profile = new Profile();
    Object.assign(profile, profileData);
    return this.profileRepository.save(profile);
  }

  /**
   * Получает все профили пользователей.
   * @returns Возвращает массив всех профилей пользователей.
   */
  async findAll(): Promise<Profile[]> {
    return this.profileRepository.find();
  }

  /**
   * Получает профиль пользователя по его ID.
   * @param id ID пользователя.
   * @returns Возвращает профиль пользователя с указанным ID.
   */
  async findOne(id: number): Promise<Profile> {
    const user = await this.profileRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException('Пользователь не найден.', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  /**
   * Обновляет профиль пользователя.
   * @param id ID пользователя.
   * @param profileData Данные для обновления профиля.
   */
  async update(id: number, profileData: UpdateProfileDto): Promise<void> {
    await this.checkUser(id);
    await this.profileRepository.update(id, profileData);
  }

  /**
   * Удаляет профиль пользователя.
   * @param id ID пользователя.
   */
  async remove(id: number): Promise<void> {
    await this.checkUser(id);
    await this.profileRepository.delete(id);
  }

  /**
   * Проверяет, существует ли пользователь с указанным ID.
   * Если пользователь не найден, выкидывается исключение HttpException с кодом 404.
   * @param id ID пользователя.
   * @returns Возвращает true, если пользователь существует, иначе выкидывает исключение HttpException.
   */
  private async checkUser(id: number): Promise<boolean> {
    const user = await this.findOne(id);
    if (!user) {
      throw new HttpException('Пользователь не найден.', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}