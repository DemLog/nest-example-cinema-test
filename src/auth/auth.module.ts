import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Profile } from '../profile/entities/profile.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProfileModule } from "../profile/profile.module";

@Module({
  // Импортируем модуль TypeOrm и регистрируем в нем сущности Auth и Profile
  imports: [
    TypeOrmModule.forFeature([Auth, Profile]),
    // Импортируем модуль Jwt и регистрируем его синхронно, указывая параметры создания токена
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),
    // Импортируем модуль ProfileModule, чтобы использовать в AuthService
    forwardRef(() => ProfileModule)
  ],
  // Регистрируем AuthService в провайдерах модуля
  providers: [AuthService],
  // Регистрируем AuthController в контроллерах модуля
  controllers: [AuthController],
  // Экспортируем AuthService и JwtModule для их использования в других модулях
  exports: [
    AuthService,
    JwtModule
  ]
})
export class AuthModule {}