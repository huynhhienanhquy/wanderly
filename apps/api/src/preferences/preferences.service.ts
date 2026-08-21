import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import type { InterestCategory, UserPreferences } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PreferencesService {
  constructor(private readonly prisma: PrismaService) {}
  categories(): Promise<InterestCategory[]> {
    return this.prisma.category.findMany({ where: { isActive: true }, orderBy: { name: 'asc' }, select: { id: true, slug: true, name: true, icon: true, description: true } });
  }

  async get(userId: string): Promise<UserPreferences> {
    const rows = await this.prisma.userPreference.findMany({ where: { userId }, orderBy: { categoryId: 'asc' }, select: { categoryId: true } });
    return { categoryIds: rows.map(({ categoryId }) => categoryId) };
  }

  async update(userId: string, categoryIds: string[]): Promise<UserPreferences> {
    const activeCount = await this.prisma.category.count({ where: { id: { in: categoryIds }, isActive: true } });
    if (activeCount !== categoryIds.length) throw new UnprocessableEntityException('Có danh mục sở thích không hợp lệ.');
    await this.prisma.$transaction([
      this.prisma.userPreference.deleteMany({ where: { userId } }),
      this.prisma.userPreference.createMany({ data: categoryIds.map((categoryId) => ({ userId, categoryId, weight: 1, source: 'EXPLICIT' })) }),
    ]);
    return { categoryIds: [...categoryIds].sort() };
  }
}
