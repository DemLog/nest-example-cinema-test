import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from "typeorm";

import { Auth } from "../auth/entities/auth.entity";
import { Profile } from "../profile/entities/profile.entity";
import { File } from "../file-upload/entities/file.entity";
import { TextBlock } from "../text-block/entities/textBlock.entity";
import { InitMigration1680747249866 } from "../migrations/1680747249866-InitMigration";

config(); // загрузка переменных окружения из файла .env

// Настройки для подключения к базе данных
export const dataSourceOptions: DataSourceOptions = {
  logging: false, // Отключаем логирование запросов
  entities: [Auth, Profile, TextBlock, File], // Список сущностей приложения
  migrationsTableName: 'migration', // Имя таблицы для хранения миграций
  migrations: [InitMigration1680747249866], // Список миграций приложения
  synchronize: false, // Отключаем автоматическую синхронизацию схемы базы данных
  type: "postgres",
  host: process.env.POSTGRESS_HOST || 'localhost',
  port: +process.env.POSTGRESS_PORT || 5432,
  username: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'postgres',
};

// Создание экземпляра DataSource
const dataSource = new DataSource(dataSourceOptions);
export default dataSource;