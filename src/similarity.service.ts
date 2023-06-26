import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';
import * as pixelmatch from 'pixelmatch';
import * as Jimp from 'jimp';
import { User } from './types/similarityRequest';

export interface SimilarityResult {
  username: string;
  similarity: number;
}

@Injectable()
export class SimilarityService {
  private async fetchImage(imageUrl: string): Promise<Jimp> {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`,
        );
      }
      const imageBuffer = await response.buffer();
      return await Jimp.read(imageBuffer);
    } catch (error) {
      throw new InternalServerErrorException(
        `Error fetching or reading image: ${error.message}`,
      );
    }
  }

  private calculateImageSimilarity(image1: Jimp, image2: Jimp): number {
    let width = image1.bitmap.width;
    let height = image1.bitmap.height;

    if (width != image2.bitmap.width || height != image2.bitmap.height) {
      width = Math.min(image1.bitmap.width, image2.bitmap.width);
      height = Math.min(image1.bitmap.height, image2.bitmap.height);

      image1 = image1.resize(width, height);
      image2 = image2.resize(width, height);
    }

    const image1Data = new Uint8Array(image1.bitmap.data.buffer);
    const image2Data = new Uint8Array(image2.bitmap.data.buffer);

    const numDiffPixels = pixelmatch(
      image1Data,
      image2Data,
      null,
      width,
      height,
      { threshold: 0.1 },
    );
    return 1 - numDiffPixels / (width * height);
  }

  async getSimilarities(
    user: User,
    candidates: User[],
  ): Promise<SimilarityResult[]> {
    const images = await Promise.all([
      this.fetchImage(user.profile_pic_url_hd),
      ...candidates.map((candidate) =>
        this.fetchImage(candidate.profile_pic_url_hd),
      ),
    ]);

    const userImage = images[0];
    const candidateImages = images.slice(1);

    const similarityResults = candidateImages.map((candidateImage, index) => {
      const similarity = this.calculateImageSimilarity(
        userImage,
        candidateImage,
      );

      return {
        username: candidates[index].username,
        similarity,
      };
    });

    return similarityResults;
  }
}
