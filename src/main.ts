import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VERSION } from './common/constants';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/Transform.intersector';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor(app.get(Reflector)));

  const config = new DocumentBuilder()
    .setTitle('Caosfit api documentation')
    .setDescription('')
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
