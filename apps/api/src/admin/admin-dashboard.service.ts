import { Injectable } from '@nestjs/common'; import { PrismaService } from '../database/prisma.service';
@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}
  async summary() {
    const [users, activeUsers, plans, places, publishedEvents, rating] = await Promise.all([
      this.prisma.user.count(), this.prisma.user.count({ where: { status: 'ACTIVE' } }), this.prisma.plan.count(),
      this.prisma.place.count({ where: { status: 'ACTIVE', deletedAt: null } }), this.prisma.event.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.review.aggregate({ where: { status: 'PUBLISHED' }, _avg: { rating: true }, _count: true }),
    ]);
    return { users, activeUsers, plans, places, publishedEvents, reviews: rating._count, averageRating: rating._avg.rating ?? null };
  }
}
