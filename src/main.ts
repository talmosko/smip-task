import { NestFactory } from '@nestjs/core';
import { SimilarityModule } from './similarity.module';

async function bootstrap() {
  const app = await NestFactory.create(SimilarityModule);
  await app.listen(3000);
}
bootstrap();
