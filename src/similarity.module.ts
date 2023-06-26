import { Module } from '@nestjs/common';
import { SimilarityController } from './similarity.controller';
import { SimilarityService } from './similarity.service';

@Module({
  imports: [],
  controllers: [SimilarityController],
  providers: [SimilarityService],
})
export class SimilarityModule {}
