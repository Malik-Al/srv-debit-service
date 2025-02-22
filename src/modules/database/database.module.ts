import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from "../../../msdata/configs/config.default.json";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.db.postgres.host,
      port: config.db.postgres.port,
      username: config.db.postgres.user,
      password: config.db.postgres.password,
      database: config.db.postgres.databases,
      entities: [],
      schema: config.db.postgres.schema
    }),
  ],
})

export class DatabaseModule {}
