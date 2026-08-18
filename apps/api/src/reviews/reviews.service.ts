import { Injectable, NotFoundException } from '@nestjs/common';
import type { Review, UpsertReviewRequest } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

function toReview(review: { id: string; placeId: string; rating: number; content: string | null; createdAt: Date; updatedAt: Date }): Review {
  return { ...review, createdAt: review.createdAt.toISOString(), updatedAt: review.updatedAt.toISOString() };
}

@Injectable()
export class ReviewsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(placeId: string): Promise<Review[]> {
    const reviews = await this.prisma.review.findMany({
      where: { placeId, status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
      take: 20,
      select: { id: true, placeId: true, rating: true, content: true, createdAt: true, updatedAt: true },
    });
    return reviews.map(toReview);
  }

  async upsert(userId: string, placeId: string, input: UpsertReviewRequest): Promise<Review> {
    const place = await this.prisma.place.findFirst({ where: { id: placeId, status: 'ACTIVE', deletedAt: null }, select: { id: true } });
    if (!place) throw new NotFoundException('Địa điểm không tồn tại.');
    const review = await this.prisma.review.upsert({
      where: { userId_placeId: { userId, placeId } },
      create: { userId, placeId, rating: input.rating, content: input.content || null },
      update: { rating: input.rating, content: input.content || null, status: 'PUBLISHED' },
      select: { id: true, placeId: true, rating: true, content: true, createdAt: true, updatedAt: true },
    });
    return toReview(review);
  }
}
