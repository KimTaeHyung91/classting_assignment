import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolPageEntity } from './domain/school/school-page.entity';
import { ISchoolService } from './domain/school/school-service.interface';
import { SchoolServiceImpl } from './domain/school/school-service.impl';
import { ISchoolWriter } from './domain/school/school-writer.interface';
import { SchoolWriterImpl } from './infrastructure/school-writer.impl';
import { SchoolFacade } from './application/school.facade';
import { SchoolApiController } from './interfaces/school-api.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SchoolPageEntity])],
  providers: [
    SchoolFacade,
    { provide: ISchoolService, useClass: SchoolServiceImpl },
    { provide: ISchoolWriter, useClass: SchoolWriterImpl },
  ],
  controllers: [SchoolApiController],
})
export class NewsFeedModule {}
