import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

import { Auth } from "./entities/auth.entity";
import { Profile } from "../profile/entities/profile.entity";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { TokenDto } from "./dto/token.dto";
import { RegisterResponseDto } from "./dto/register-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    private jwtService: JwtService
  ) {}

  /**
   * Регистрирует пользователя, сохраняя его данные в базе данных и выдаёт токен.
   * @param registerDto - данные нового пользователя
   * @returns - токен и данные профиля пользователя
   */
  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const { login, password, ...profileData } = registerDto;

    // Проверяем, есть ли уже пользователь с таким логином в базе данных
    const existingUser = await this.authRepository.findOne({ where: { login } });
    if (existingUser) {
      throw new HttpException('Пользователь с таким логином уже существует', HttpStatus.BAD_REQUEST);
    }

    // Хэшируем пароль
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаём новый объект Auth и сохраняем его в базу данных
    const newAuthUser = this.authRepository.create({
      login,
      password: hashedPassword,
      role: "user"
    });
    await this.authRepository.save(newAuthUser);

    // Создаём новый объект Profile, связываем его с объектом Auth и сохраняем в базу данных
    const newProfileUser = this.profileRepository.create({
      ...profileData,
      auth: newAuthUser
    });
    await this.profileRepository.save(newProfileUser);

    // Генерируем и возвращаем токен и данные профиля пользователя
    const token = await this.generateToken(newAuthUser);
    return { token, ...newProfileUser };
  }

  /**
   * Проверяет данные пользователя и выдаёт токен.
   * @param loginDto - данные пользователя
   * @returns - токен
   */
  async login(loginDto: LoginDto): Promise<TokenDto> {
    const user = await this.validateUser(loginDto);

    // Генерируем и возвращаем токен
    const token = await this.generateToken(user);
    return { token };
  }

  /**
   * Генерирует JWT токен для пользователя.
   * @param user - пользователь
   * @returns - JWT токен
   */
  private async generateToken(user: Auth): Promise<string> {
    const payload: Token = { userId: user.id, roles: user.role };
    return this.jwtService.sign(payload);
  }

  /**
   * Проверяет пользователя на наличие в базе данных.
   * @param loginDto - данные пользователя
   * @returns - объект Auth
   */
  private async validateUser(loginDto: LoginDto): Promise<Auth> {
    const user = await this.authRepository.findOne({ where: { login: loginDto.login } });
    if (!user) {
      throw new HttpException("Неправильный логин или пароль.", HttpStatus.BAD_REQUEST);
    }
    const passwordEquals = await bcrypt.compare(loginDto.password, user.password);
    if (!passwordEquals) {
      throw new HttpException("Неправильный логин или пароль.", HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}