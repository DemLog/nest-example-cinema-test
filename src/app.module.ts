import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { dataSourceOptions } from "./config/data-source";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./common/guards/jwt-auth.guard";
import { RolesGuard } from "./common/guards/roles.guard";
import { TextBlockModule } from './text-block/text-block.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import * as path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    ProfileModule,
    TextBlockModule,
    FileUploadModule,
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, 'file-upload', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    },
  ],
})
export class AppModule {}
