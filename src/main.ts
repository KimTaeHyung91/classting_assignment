import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext } from 'typeorm-transactional';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { AllCatchExceptionFilter } from './base/filter/all-catch-exception.filter';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new AllCatchExceptionFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  const build = new DocumentBuilder().setTitle('Classting Assignment').build();
  const openAPIObject = SwaggerModule.createDocument(app, build);
  SwaggerModule.setup('api-doc', app, openAPIObject);

  await app.listen(3000);
  Logger.log(`current environment: ${config.get('config.env')}`, `Bootstrap`);
}

bootstrap().catch((error) => console.error(error));
