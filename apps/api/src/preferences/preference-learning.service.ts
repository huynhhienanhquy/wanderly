import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

const SIGNAL_WEIGHT = { LOVED: 1, OKAY: 0.25, DISLIKED: -1, SKIP: -0.5, REPLACE: -0.4, VISITED: 0.6 } as const;

@Injectable()
export class PreferenceLearningService {
  constructor(private readonly prisma: PrismaService) {}

  async recalculate(userId: string): Promise<{ updatedCategories: number }> {
    const signals = await this.prisma.userFeedback.findMany({
      where: { userId, placeId: { not: null } },
      orderBy: { createdAt: 'desc' },
      take: 500,
      include: { place: { include: { categories: true } } },
    });
    const scores = new Map<string, number>();
    for (const signal of signals) {
      const score = SIGNAL_WEIGHT[signal.feedbackType];
      for (const { categoryId } of signal.place?.categories ?? []) {
        scores.set(categoryId, (scores.get(categoryId) ?? 0) + score);
      }
    }
    await this.prisma.$transaction([...scores].map(([categoryId, score]) => this.prisma.userPreference.upsert({
      where: { userId_categoryId: { userId, categoryId } },
      create: { userId, categoryId, weight: Math.max(0, Math.min(1, 0.5 + score / 10)), source: 'LEARNED' },
      update: { weight: Math.max(0, Math.min(1, 0.5 + score / 10)), source: 'LEARNED' },
    })));
    return { updatedCategories: scores.size };
  }
}
