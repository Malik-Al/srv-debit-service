import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../msdata/configs/config.default.json'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.main.port ?? 3000);
}
bootstrap();
