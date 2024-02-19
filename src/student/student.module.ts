import { Module } from '@nestjs/common';
import { SchoolModule } from '../school/school.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './domain/student.entity';
import { StudentSchoolPageEntity } from './domain/student-school-page.entity';
import { StudentReader } from './domain/student.reader';
import { StudentReaderImpl } from './infrastructure/student.reader.impl';
import { StudentWriter } from './domain/student.writer';
import { StudentWriterImpl } from './infrastructure/student.writer.impl';
import { StudentService } from './domain/student.service';
import { StudentServiceImpl } from './domain/student.service.impl';
import { StudentApiController } from './interfaces/student-api.controller';
import { StudentFacade } from './application/student.facade';

@Module({
  imports: [
    SchoolModule,
    TypeOrmModule.forFeature([StudentEntity, StudentSchoolPageEntity]),
  ],
  providers: [
    StudentFacade,
    { provide: StudentService, useClass: StudentServiceImpl },
    { provide: StudentReader, useClass: StudentReaderImpl },
    { provide: StudentWriter, useClass: StudentWriterImpl },
  ],
  controllers: [StudentApiController],
})
export class StudentModule {}
