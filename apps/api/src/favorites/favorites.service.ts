import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(userId: string) {
    return this.prisma.favorite.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: { place: { select: { id: true, slug: true } } },
    }).then((favorites) => favorites.map(({ place }) => place));
  }

  async add(userId: string, placeId: string) {
    const place = await this.prisma.place.findFirst({
      where: { id: placeId, status: 'ACTIVE', deletedAt: null },
      select: { id: true, slug: true },
    });
    if (!place) throw new NotFoundException('Địa điểm không tồn tại.');
    await this.prisma.favorite.upsert({
      where: { userId_placeId: { userId, placeId } },
      create: { userId, placeId },
      update: {},
    });
    return place;
  }

  async remove(userId: string, placeId: string): Promise<void> {
    await this.prisma.favorite.deleteMany({ where: { userId, placeId } });
  }
}
