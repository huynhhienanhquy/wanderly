import { Inject, Injectable } from '@nestjs/common';
import { PlaceProvider, PlaceStatus } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { PLACES_PROVIDER, type PlacesProvider } from './places-provider';

@Injectable()
export class PlacesSyncService {
  constructor(
    @Inject(PLACES_PROVIDER) private readonly provider: PlacesProvider,
    private readonly prisma: PrismaService,
  ) {}

  async sync(): Promise<{ createdOrUpdated: number }> {
    const places = await this.provider.fetchPlaces();
    for (const place of places) {
      if (!place.providerPlaceId) continue;
      const data = {
        name: place.name,
        slug: place.slug,
        description: place.description,
        address: place.address,
        district: place.district,
        city: place.city,
        countryCode: place.countryCode,
        latitude: place.latitude,
        longitude: place.longitude,
        rating: place.rating,
        reviewCount: place.reviewCount,
        priceMin: place.priceMin,
        priceMax: place.priceMax,
        typicalDurationMinutes: place.typicalDurationMinutes,
        indoorOutdoor: place.indoorOutdoor,
        status: PlaceStatus.ACTIVE,
        lastSyncedAt: new Date(),
        categories: {
          deleteMany: {},
          create: place.categorySlugs.map((categorySlug) => ({
            category: { connectOrCreate: { where: { slug: categorySlug }, create: { slug: categorySlug, name: categorySlug.replaceAll('-', ' ') } } },
          })),
        },
      };
      await this.prisma.place.upsert({
        where: { provider_providerPlaceId: { provider: PlaceProvider.GOOGLE, providerPlaceId: place.providerPlaceId } },
        create: { ...data, provider: PlaceProvider.GOOGLE, providerPlaceId: place.providerPlaceId },
        update: data,
      });
    }
    return { createdOrUpdated: places.length };
  }
}
