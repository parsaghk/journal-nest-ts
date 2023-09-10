import { AppConfigService } from '@config/app';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Journal system')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  const swaggerPath = 'swagger';
  SwaggerModule.setup(swaggerPath, app, document);
  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
  logger.log(`Server is running on ${appConfigService.url}`);
  logger.log(`Swagger is running on ${appConfigService.url}/${swaggerPath}`);
}

bootstrap();
