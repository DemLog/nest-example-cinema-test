import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Profile } from "./entities/profile.entity";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  // Импортируем TypeOrmModule для работы с базой данных
  // и регистрируем сущность Profile в качестве провайдера
  imports: [
    TypeOrmModule.forFeature([Profile]),
    // forwardRef используется для разрешения циклической зависимости
    forwardRef(() => AuthModule)
  ],
  // Регистрируем контроллер
  controllers: [ProfileController],
  // Регистрируем сервис
  providers: [ProfileService],
})
export class ProfileModule {}