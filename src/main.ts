import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { AllCatchExceptionFilter } from './base/filter/all-catch-exception.filter';

async function bootstrap() {
  const logger = new Logger();

  initializeTransactionalContext({
    storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE,
  });

  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
    bufferLogs: true,
  });

  const config = app.get(ConfigService);
  const exceptionFilter = new AllCatchExceptionFilter(
    app.get(HttpAdapterHost),
    logger,
  );
  const pipes = new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(exceptionFilter);
  app.useGlobalPipes(pipes);

  logger.log(`current environment: ${config.get('common.nodeEnv')}`);

  await app.listen(3001);
}
bootstrap().catch((error) => console.error(error));
