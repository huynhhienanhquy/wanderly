import { Injectable } from '@nestjs/common';
import type { InterestCategory } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class PreferencesService {
  constructor(private readonly prisma: PrismaService) {}
  categories(): Promise<InterestCategory[]> {
    return this.prisma.category.findMany({ where: { isActive: true }, orderBy: { name: 'asc' }, select: { id: true, slug: true, name: true, icon: true, description: true } });
  }
}
