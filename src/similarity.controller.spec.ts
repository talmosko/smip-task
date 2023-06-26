import { Test, TestingModule } from '@nestjs/testing';
import { SimilarityService } from './similarity.service';
import { User } from './types/similarityRequest';

describe('SimilarityService', () => {
  let service: SimilarityService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SimilarityService],
    }).compile();

    service = module.get<SimilarityService>(SimilarityService);
  });

  describe('getSimilarities', () => {
    it('should calculate similarities between user and candidates', async () => {
      const user = {
        username: 'tylerzwise',
        profile_pic_url_hd:
          'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/337353437_720257336503123_5275789968609357479_n.jpg',
      };
      const candidates = [
        {
          username: '_tylerzwise_',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/330199544_251674530521603_4851066537436589801_n.jpg',
        },
        {
          username: '__tylerzwise',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/320995880_218629523927060_8365376547807379027_n.jpg',
        },
        {
          username: 'tylerz.wise1',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/349006844_632866595084751_6033577334488073847_n.jpg',
        },
        {
          username: 'tylerzwise_privates_',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/324724817_5803065516436190_3012982494802970997_n.jpg',
        },
        {
          username: 'tyler.zwise_',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/308238424_551509470111391_3436235572954513480_n.jpg',
        },
        {
          username: 'tylerzwisezz',
          profile_pic_url_hd:
            'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/348835956_1392339544946667_2343963022224911754_n.jpg',
        },
      ];

      const results = await service.getSimilarities(
        user as User,
        candidates as User[],
      );

      expect(typeof results).toBe('object');

      candidates.forEach((candidate, index) => {
        expect(results[index]).toHaveProperty('username', candidate.username);
      });

      for (const result of Object.values(results)) {
        expect(typeof result).toBe('object');
        expect(result.similarity).toBeGreaterThanOrEqual(0);
        expect(result.similarity).toBeLessThanOrEqual(1);
      }
    }, 10000);
    test.each([
      [
        'tylerzwise',
        'https://media.licdn.com/dms/image/C4D03AQEkf3DCfRirBQ/profile-displayphoto-shrink_800_800/0/1661764611006?e=1693440000&v=beta&t=pNrBbzZfFdReSxuWUspiXnFIKKMvGoIVJstNPEa3ve8',
        '_tylerzwise_',
        'https://i0.wp.com/tmosko.com/wp-content/uploads/2020/03/new-headshot.png?w=431&ssl=1',
        0.5,
      ],
      [
        'tylerzwise',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKj2tgmwDQqe8yRn-ksImEbrLvOdGaAvDP9ztjeJNK93E4NX8',
        '___',
        'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQXkz-pqGWwHKqC80WEeo0ySDYKTKeg6Qr5-frbNoSyGfwoqaEQ',
        0.5,
      ],
      [
        'tylerzwise',
        'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/324724817_5803065516436190_3012982494802970997_n.jpg',
        'dsdsa',
        'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/330199544_251674530521603_4851066537436589801_n.jpg',
        0.5,
      ],
    ])(
      'should calculate high similarity for different images',
      async (username1, img1, username2, img2, expectedSimilarity) => {
        const user = { username: username1, profile_pic_url_hd: img1 };
        const candidate = { username: username2, profile_pic_url_hd: img2 };
        const results = await service.getSimilarities(user as User, [
          candidate as User,
        ]);

        expect(results[0].similarity).toBeGreaterThan(expectedSimilarity);
      },
      10000,
    );
    test.each([
      [
        'tylerzwise',
        'https://media.licdn.com/dms/image/C4D03AQEkf3DCfRirBQ/profile-displayphoto-shrink_800_800/0/1661764611006?e=1693440000&v=beta&t=pNrBbzZfFdReSxuWUspiXnFIKKMvGoIVJstNPEa3ve8',
        '_tylerzwise_',
        'https://img.freepik.com/premium-vector/white-texture-round-striped-surface-white-soft-cover_547648-928.jpg',
        0.2,
      ],
      [
        'tylerzwise',
        'https://images.immediate.co.uk/production/volatile/sites/25/2023/02/why-sky-blue-2db86ae.jpg?resize=768,574',
        '___',
        'https://tg-cdn.azureedge.net/sites/default/files/2019-10/grass-383284_1920-%281%29.jpg',
        0.2,
      ],
      [
        'tylerzwise',
        'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/308238424_551509470111391_3436235572954513480_n.jpg',
        '___',
        'https://smip-users-media.s3.us-east-1.amazonaws.com/home-task-impersonators/324724817_5803065516436190_3012982494802970997_n.jpg',
        0.1,
      ],
    ])(
      'should calculate low similarity for different images',
      async (username1, img1, username2, img2, expectedSimilarity) => {
        const user = { username: username1, profile_pic_url_hd: img1 };
        const candidate = { username: username2, profile_pic_url_hd: img2 };
        const results = await service.getSimilarities(user as User, [
          candidate as User,
        ]);

        expect(results[0].similarity).toBeLessThan(expectedSimilarity);
      },
      10000,
    );
  });
});
