import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import config from '../msdata/configs/config.default.json'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import pckJson from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const documentsConfig = new DocumentBuilder()
  .setTitle(config.swagger.title)
  .setDescription(config.swagger.desc)
  .setVersion(pckJson.version)
  .addTag(`Author: ${pckJson.author}`)
  .build();
  
  const document = SwaggerModule.createDocument(app, documentsConfig);
  SwaggerModule.setup('/api/docs/swagger', app, document);
  
  await app.listen(config.main.port ?? 3000);
}
bootstrap();
