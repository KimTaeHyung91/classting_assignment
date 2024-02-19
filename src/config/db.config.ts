import { registerAs } from '@nestjs/config';

export default registerAs(
  'db',
  () =>
    ({
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }) as const,
);
