import { registerAs } from '@nestjs/config';

const config = registerAs('config', () => ({
  postgres: {
    dbName: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
  },
  jwtSecret: process.env.JWT_SECRET,
}));

export default config;
