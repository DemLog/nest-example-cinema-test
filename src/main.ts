import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configSwagger = new DocumentBuilder()
    .setTitle('Nest Example Cinema')
    .setDescription('Документация REST API')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build()
  const documentSwagger = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/docs', app, documentSwagger);

  await app.listen(3000);
}
bootstrap();
