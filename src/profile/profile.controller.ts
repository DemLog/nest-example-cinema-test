import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse, ApiOkResponse,
  ApiOperation,
  ApiTags
} from "@nestjs/swagger";
import { Profile } from "./entities/profile.entity";
import { Roles } from "../common/decorators/roles.decorator";

@ApiTags("Профили")
@ApiBearerAuth()
@Controller("profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {
  }

  @ApiOperation({ summary: "Создание профиля пользователя" })
  @ApiCreatedResponse({ description: "Пользователь успешно создан.", type: Profile })
  @Roles('admin')
  @Post("")
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({ summary: "Получение всех профилей пользователей" })
  @ApiOkResponse({ description: "Данные пользователей получены", type: [Profile] })
  @Roles('admin')
  @Get("")
  async findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({ summary: "Получить профиль пользователя по ID" })
  @ApiOkResponse({ description: "Данные пользователя получены", type: Profile })
  @Roles('admin', 'user')
  @Get(":id")
  async findUserProfile(@Param("id") id: number) {
    return this.profileService.findOne(id);
  }

  @ApiOperation({ summary: "Редактировать профиль пользователя" })
  @ApiOkResponse({ description: "Пользователь обновлен успешно." })
  @Roles('admin', 'user')
  @Put(":id")
  async update(@Param("id") id: number, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({ summary: "Удалить профиль пользователя" })
  @ApiNoContentResponse({ description: "Пользователь был удален." })
  @Roles('admin', 'user')
  @Delete(":id")
  async remove(@Param("id") id: number) {
    return this.profileService.remove(id);
  }
}
