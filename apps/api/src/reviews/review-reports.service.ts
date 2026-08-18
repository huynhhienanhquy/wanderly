import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ReviewReportsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(reporterUserId: string, reviewId: string, reason: string) {
    const review = await this.prisma.review.findFirst({ where: { id: reviewId, status: 'PUBLISHED' }, select: { id: true } });
    if (!review) throw new NotFoundException('Đánh giá không tồn tại.');
    return this.prisma.reviewReport.upsert({
      where: { reviewId_reporterUserId: { reviewId, reporterUserId } },
      create: { reviewId, reporterUserId, reason },
      update: { reason, status: 'OPEN', resolvedAt: null, resolvedByUserId: null },
      select: { id: true, reviewId: true, reason: true, status: true, createdAt: true },
    });
  }
}
