import { Injectable, NotFoundException } from '@nestjs/common';
import type { ModerateReviewReportRequest } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminReportsService {
  constructor(private readonly prisma: PrismaService) {}

  list(status?: 'OPEN' | 'RESOLVED' | 'DISMISSED') {
    return this.prisma.reviewReport.findMany({
      where: status ? { status } : {},
      orderBy: { createdAt: 'desc' },
      take: 50,
      include: { review: { select: { id: true, rating: true, content: true, placeId: true, status: true } } },
    });
  }

  async moderate(adminUserId: string, reportId: string, input: ModerateReviewReportRequest) {
    const current = await this.prisma.reviewReport.findUnique({ where: { id: reportId }, include: { review: true } });
    if (!current) throw new NotFoundException('Báo cáo không tồn tại.');
    return this.prisma.$transaction(async (transaction) => {
      if (input.hideReview) await transaction.review.update({ where: { id: current.reviewId }, data: { status: 'HIDDEN' } });
      const report = await transaction.reviewReport.update({
        where: { id: reportId },
        data: { status: input.status, resolvedByUserId: adminUserId, resolvedAt: new Date() },
        include: { review: { select: { id: true, rating: true, content: true, placeId: true, status: true } } },
      });
      await transaction.adminAuditLog.create({
        data: { adminUserId, action: 'MODERATE_REVIEW_REPORT', entityType: 'ReviewReport', entityId: reportId, beforeData: current as never, afterData: report as never },
      });
      return report;
    });
  }
}
