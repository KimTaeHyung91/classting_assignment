import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1708076255612 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS classting.school_page
          (
              id                int          NOT NULL AUTO_INCREMENT,
              school_page_token varchar(255) NOT NULL,
              school_name       varchar(255) NOT NULL,
              location          varchar(255) NOT NULL,
              created_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              updated_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP (6),
              deleted_at        timestamp(6) NULL,
              INDEX             school_page_idx_01 (school_page_token),
              PRIMARY KEY (id)
          ) ENGINE=InnoDB;
      `);

      await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS classting.student_school_page
          (
              id                  int          NOT NULL AUTO_INCREMENT,
              subscribe_at        datetime NULL,
              cancel_subscribe_at datetime NULL,
              subscribe_status    enum ('ACTIVE', 'IN-ACTIVE') NOT NULL,
              student_id          int NULL,
              school_page_id      int NULL,
              created_at          timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              updated_at          timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP (6),
              deleted_at          timestamp(6) NULL,
              PRIMARY KEY (id)
          ) ENGINE = InnoDB;
      `);

      await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS classting.student
          (
              id                int          NOT NULL AUTO_INCREMENT,
              student_token     varchar(255) NOT NULL,
              student_name      varchar(255) NOT NULL,
              age               int          NOT NULL,
              city              varchar(255) NULL,
              road_address      varchar(255) NULL,
              numbering_address varchar(255) NULL,
              created_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              updated_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP (6),
              deleted_at        timestamp(6) NULL,
              INDEX             student_idx_01 (student_token),
              PRIMARY KEY (id)
          ) ENGINE = InnoDB;
      `);

      await queryRunner.query(`
          CREATE TABLE IF NOT EXISTS classting.school_news
          (
              id                int          NOT NULL AUTO_INCREMENT,
              school_news_token varchar(255) NOT NULL,
              title             varchar(255) NOT NULL,
              content           varchar(255) NOT NULL,
              school_page_id    int NULL,
              created_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
              updated_at        timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP (6),
              deleted_at        timestamp(6) NULL,
              INDEX             school_news_idx_01 (school_news_token),
              PRIMARY KEY (id)
          ) ENGINE=InnoDB;
      `);

      await queryRunner.query(`
          INSERT INTO classting.student (id, student_token, student_name, age, city, road_address, numbering_address,
                                         created_at, updated_at, deleted_at)
          VALUES (1, '43a040cc07543a8c87cc6b31c5953530', '홍길동', 17, '서울', null, null, '2024-02-17 16:36:13.529000',
                  '2024-02-17 16:36:13.529000', null),
                 (2, '4c913002a0efdc17baaa3de32fe4be43', '홍길자', 18, '서울', null, null, '2024-02-17 16:39:21.776000',
                  '2024-02-17 16:39:21.776000', null);
      `);

      await queryRunner.query(`
          INSERT INTO classting.school_page (id, school_page_token, school_name, location, created_at, updated_at,
                                             deleted_at)
          VALUES (1, '48afb75dd8e7c815af0a8185582f378f', 'Test', 'Seoul', '2024-02-17 16:35:54.172000',
                  '2024-02-17 16:35:54.174000', null),
                 (2, '491bd8bd0a30463dbd146abd2cc215e8', 'Test2', 'Seoul', '2024-02-17 16:38:17.914000',
                  '2024-02-17 16:38:17.914000', null),
                 (3, '414b19866dc1ce88afc53d9cf49c78ae', 'Test3', 'Seoul', '2024-02-17 16:38:20.289000',
                  '2024-02-17 16:38:20.290000', null),
                 (4, '4b1f5d39edddb43e98028ae977116a48', 'Test4', 'Seoul', '2024-02-17 16:38:22.730000',
                  '2024-02-17 16:38:22.730000', null),
                 (5, '4e2cb68e75fbd284a37f45a63da8f98a', 'Test5', 'Seoul', '2024-02-17 16:38:25.684000',
                  '2024-02-17 16:38:25.684000', null),
                 (6, '4c4ccf931893d3e1b10d56e80b0ff3a9', 'Test6', 'Seoul', '2024-02-17 16:38:28.634000',
                  '2024-02-17 16:38:28.635000', null),
                 (7, '4202df910a456d75a6afbcbc20d3e9b8', 'Test7', 'Seoul', '2024-02-17 16:38:32.699000',
                  '2024-02-17 16:38:32.699000', null),
                 (8, '47cfdd02be9a4930bcb2cb384fb282a3', 'Test8', 'Seoul', '2024-02-17 16:38:35.566000',
                  '2024-02-17 16:38:35.566000', null),
                 (9, '4b6583f970676571a5090e1b378eb5e7', 'Test9', 'Seoul', '2024-02-17 16:38:39.918000',
                  '2024-02-17 16:38:39.918000', null),
                 (10, '40b2968c6bde451f96ec21fdca2d6262', 'Test10', 'Seoul', '2024-02-17 16:38:43.773000',
                  '2024-02-17 16:38:43.773000', null),
                 (11, '4af7b4dfe0132ba1aba941c2e05bc237', 'Test11', 'Seoul', '2024-02-17 16:38:46.470000',
                  '2024-02-17 16:38:46.471000', null),
                 (12, '45bb6c114c555b7a8b0ff0a94a8096dd', 'Test12', 'Seoul', '2024-02-17 16:38:49.867000',
                  '2024-02-17 16:38:49.867000', null),
                 (13, '49f929cd344238a697a6181a5f244167', 'Test13', 'Seoul', '2024-02-17 16:38:52.501000',
                  '2024-02-17 16:38:52.501000', null);
      `);

      await queryRunner.query(`
          INSERT INTO classting.school_news (id, school_news_token, title, content, school_page_id, created_at,
                                             updated_at, deleted_at)
          VALUES (1, '40b4df4d871ba3a1b014661041a93b6a', 'title', 'change content', 1, '2024-02-17 16:35:59.478000',
                  '2024-02-17 07:36:08.000000', null),
                 (2, '45bbaa2f0f44c8e9bc05832f541714d9', 'title2', 'content2', 1, '2024-02-17 17:32:03.215000',
                  '2024-02-17 17:32:03.217000', null),
                 (3, '497abae1156d5da38020422ea4120248', 'title3', 'content3', 1, '2024-02-17 17:32:07.834000',
                  '2024-02-17 17:32:07.834000', null),
                 (4, '4763315b31ce2181a78ca48f1b05417a', 'title4', 'content4', 1, '2024-02-17 17:32:13.268000',
                  '2024-02-17 17:32:13.269000', null),
                 (5, '4cfce3516261aa90ab47790e574ca01b', 'title5', 'content5', 1, '2024-02-17 17:32:17.901000',
                  '2024-02-17 17:32:17.901000', null),
                 (6, '4abb8ec31b430bf08368190f75e4129f', 'title6', 'content6', 1, '2024-02-17 17:32:23.530000',
                  '2024-02-17 08:32:38.247265', null);
      `);

      await queryRunner.query(`
          insert into classting.student_school_page (id, subscribe_at, cancel_subscribe_at, subscribe_status,
                                                     student_id, school_page_id, created_at, updated_at, deleted_at)
          values (1, '2024-02-17 16:37:48', null, 'ACTIVE', 1, 1, '2024-02-17 16:37:48.023000',
                  '2024-02-17 16:37:48.023000', null),
                 (2, '2024-02-17 16:39:27', null, 'ACTIVE', 2, 1, '2024-02-17 16:39:26.589000',
                  '2024-02-17 16:39:26.589000', null),
                 (3, '2024-02-17 16:39:45', '2024-02-17 17:31:23', 'IN-ACTIVE', 2, 2, '2024-02-17 16:39:44.989000',
                  '2024-02-17 17:31:22.908000', null);
      `);
    } catch (error) {
      console.error(error);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
