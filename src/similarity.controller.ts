import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { SimilarityService, SimilarityResult } from './similarity.service';
import { SimilarityRequest } from './types/similarityRequest';

@Controller()
export class SimilarityController {
  constructor(private readonly similarityService: SimilarityService) {}

  @Post()
  async compareUserWithCandidates(
    @Body() body: SimilarityRequest,
  ): Promise<SimilarityResult[]> {
    const { user, candidates } = body;

    if (!user.username || !user.profile_pic_url_hd) {
      throw new BadRequestException(
        'User must have a username and a profile image URL',
      );
    }

    candidates.forEach((candidate) => {
      if (!candidate.username || !candidate.profile_pic_url_hd) {
        throw new BadRequestException(
          'Each candidate must have a username and a profile image URL',
        );
      }
    });

    return await this.similarityService.getSimilarities(user, candidates);
  }
}
