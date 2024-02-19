import { Module } from '@nestjs/common';
import { SchoolService } from './domain/school.service';
import { SchoolServiceImpl } from './domain/school.service.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageEntity } from './domain/school-page.entity';
import { SchoolWriter } from './domain/school.writer';
import { SchoolWriterImpl } from './infrastructure/school.writer.impl';
import { SchoolReader } from './domain/school.reader';
import { SchoolReaderImpl } from './infrastructure/school.reader.impl';
import { SchoolNewsEntity } from './domain/news/school-news.entity';
import { SchoolFacade } from './application/school.facade';
import { SchoolApiController } from './interfaces/school-api.controller';
import { InternalSchoolReader } from './domain/internal/internal-school.reader';
import { InternalSchoolReaderImpl } from './domain/internal/internal-school.reader.impl';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolPageEntity, SchoolNewsEntity])],
  providers: [
    SchoolFacade,
    { provide: SchoolService, useClass: SchoolServiceImpl },
    { provide: SchoolReader, useClass: SchoolReaderImpl },
    { provide: SchoolWriter, useClass: SchoolWriterImpl },
    {
      provide: InternalSchoolReader,
      useClass: InternalSchoolReaderImpl,
    },
  ],
  controllers: [SchoolApiController],
  exports: [InternalSchoolReader],
})
export class SchoolModule {}
