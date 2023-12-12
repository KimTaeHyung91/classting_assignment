import { EntityManager } from 'typeorm';
import { MySqlContainer, StartedMySqlContainer } from '@testcontainers/mysql';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { NewsFeedModule } from '../../../src/news-feed/news-feed.module';
import { SchoolPageEntity } from '../../../src/news-feed/domain/school/school-page.entity';
import { getOnlyTestTypeORM } from '../../getOnlyTestTypeORM';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { has } from 'lodash';

describe('SchoolApi E2E Test', () => {
  let app: INestApplication;
  let em: EntityManager;
  let dbContainer: StartedMySqlContainer;

  beforeAll(async () => {
    initializeTransactionalContext();
    dbContainer = await new MySqlContainer().start();

    const module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync(
          getOnlyTestTypeORM(dbContainer, [SchoolPageEntity]),
        ),
        NewsFeedModule,
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('(POST) /api/v1/school/page - 학교 페이지가 생성되어야된다.', async () => {
    // given
    const region = 'SEOUL';
    const schoolName = 'Test';

    // when
    const response = await request(app.getHttpServer())
      .post('/api/v1/school/page')
      .send({
        region,
        schoolName,
      });

    // then
    expect(response.statusCode).toEqual(201);
    expect(has(response.body.data, 'schoolPageToken')).toBeTruthy();
    expect(response.body.message).toBeNull();
    expect(response.body.errorCode).toBeNull();
    expect(response.body.result).toEqual('SUCCESS');
  });

  afterAll(async () => {
    await app.close();
    await em.clear(SchoolPageEntity);
  });
});
