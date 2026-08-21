import { Injectable, NotFoundException } from '@nestjs/common';
import { normalizePlaceInput } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class AdminCatalogService {
  constructor(private readonly prisma: PrismaService) {}
  places() { return this.prisma.place.findMany({ where: { deletedAt: null }, orderBy: { updatedAt: 'desc' }, take: 100, include: { categories: { include: { category: true } } } }); }
  categories() { return this.prisma.category.findMany({ orderBy: { name: 'asc' } }); }
  upsertPlace(input: unknown, id?: string) {
    const place = normalizePlaceInput(input);
    const data = { name: place.name, slug: place.slug, description: place.description, address: place.address, district: place.district, city: place.city, countryCode: place.countryCode, latitude: place.latitude, longitude: place.longitude, rating: place.rating, reviewCount: place.reviewCount, priceMin: place.priceMin, priceMax: place.priceMax, typicalDurationMinutes: place.typicalDurationMinutes, indoorOutdoor: place.indoorOutdoor, status: 'ACTIVE' as const, categories: { deleteMany: {}, create: place.categorySlugs.map((slug) => ({ category: { connectOrCreate: { where: { slug }, create: { slug, name: slug.replaceAll('-', ' ') } } } })) } };
    return id ? this.prisma.place.update({ where: { id }, data }) : this.prisma.place.create({ data: { ...data, provider: 'INTERNAL', providerPlaceId: place.providerPlaceId } });
  }
  async removePlace(id: string) { const result = await this.prisma.place.updateMany({ where: { id, deletedAt: null }, data: { deletedAt: new Date(), status: 'INACTIVE' } }); if (!result.count) throw new NotFoundException('Không tìm thấy địa điểm.'); }
  upsertCategory(slug: string, name: string) { return this.prisma.category.upsert({ where: { slug }, create: { slug, name }, update: { name, isActive: true } }); }
  async removeCategory(id: string) { const result = await this.prisma.category.updateMany({ where: { id }, data: { isActive: false } }); if (!result.count) throw new NotFoundException('Không tìm thấy danh mục.'); }
}
