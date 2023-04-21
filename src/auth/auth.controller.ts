import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RegisterResponseDto } from "./dto/register-response.dto";
import { TokenDto } from "./dto/token.dto";
import { Public } from "../common/decorators/public.decorator";

@ApiTags("Авторизация")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Регистрация нового пользователя
  @ApiOperation({ summary: "Создание профиля пользователя" })
  @ApiCreatedResponse({ description: "Пользователь был зарегистрирован", type: RegisterResponseDto })
  @Public()
  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    // Вызываем метод регистрации в сервисе, передавая ему объект регистрации
    const result = await this.authService.register(registerDto);
    return result;
  }

  // Авторизация пользователя
  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiOkResponse({description: "Пользователь был авторизован", type: TokenDto})
  @ApiBadRequestResponse({description: "Неправильный логин или пароль."})
  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    // Вызываем метод авторизации в сервисе, передавая ему объект авторизации
    const result = await this.authService.login(loginDto);
    return result;
  }
}
