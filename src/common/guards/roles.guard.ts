import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Получаем список ролей, необходимых для выполнения операции из метаданных
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // Если для выполнения операции не требуются роли, то разрешаем выполнение
    if (!roles) {
      return true;
    }
    // Получаем данные пользователя из запроса
    const request = context.switchToHttp().getRequest();
    const user: Token = request.user;
    // Если пользователь не авторизован, то выбрасываем исключение
    if (!user) {
      throw new HttpException("Пользователь не авторизован", HttpStatus.UNAUTHORIZED)
    }

    // Если у пользователя есть роль admin, то разрешаем выполнение
    if (user.roles === 'admin') {
      return true;
    }

    // Если у пользователя нет необходимой роли, то выбрасываем исключение
    if (!roles.includes(user.roles)) {
      throw new HttpException("Недостаточно прав для выполнения операции.", HttpStatus.FORBIDDEN)
    }

    // Получаем id пользователя из параметров запроса и сравниваем его с id пользователя из токена
    const userId = +request.params.id;
    if (userId && userId !== user.userId) {
      throw new HttpException("Недостаточно прав для выполнения операции.", HttpStatus.FORBIDDEN);
    }

    // Разрешаем выполнение операции
    return true;
  }
}