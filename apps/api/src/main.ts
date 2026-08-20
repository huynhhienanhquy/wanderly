import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { validateEnvironment } from './config/environment';

async function bootstrap() {
  const environment = validateEnvironment();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: environment.webUrl,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Wanderly API')
    .setDescription('API dùng chung cho Wanderly Web và Mobile.')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    jsonDocumentUrl: 'docs/openapi.json',
  });

  await app.listen(environment.port);
}

void bootstrap();
