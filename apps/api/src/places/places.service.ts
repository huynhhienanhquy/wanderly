import { Injectable } from '@nestjs/common';
import type {
  PlaceListQuery,
  PlaceListResponse,
  PlaceSummary,
} from '@wanderly/contracts';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { decodePlaceCursor, encodePlaceCursor } from './place-cursor';

const select = {
  id: true,
  slug: true,
  name: true,
  description: true,
  address: true,
  district: true,
  city: true,
  latitude: true,
  longitude: true,
  rating: true,
  reviewCount: true,
  priceMin: true,
  priceMax: true,
  typicalDurationMinutes: true,
  indoorOutdoor: true,
  categories: {
    orderBy: { relevance: 'desc' },
    select: { category: { select: { slug: true, name: true } } },
  },
  images: { where: { isCover: true }, take: 1, select: { url: true } },
} satisfies Prisma.PlaceSelect;

type PlaceRow = Prisma.PlaceGetPayload<{ select: typeof select }>;

function orderBy(
  sort: PlaceListQuery['sort'],
): Prisma.PlaceOrderByWithRelationInput[] {
  switch (sort) {
    case 'popular':
      return [{ popularityScore: 'desc' }, { id: 'asc' }];
    case 'rating':
      return [{ rating: { sort: 'desc', nulls: 'last' } }, { id: 'asc' }];
    case 'newest':
      return [{ createdAt: 'desc' }, { id: 'asc' }];
    case 'priceAsc':
      return [{ priceMin: { sort: 'asc', nulls: 'last' } }, { id: 'asc' }];
  }
}

function toSummary(place: PlaceRow): PlaceSummary {
  return {
    id: place.id,
    slug: place.slug,
    name: place.name,
    description: place.description,
    address: place.address,
    district: place.district,
    city: place.city,
    latitude: Number(place.latitude),
    longitude: Number(place.longitude),
    rating: place.rating === null ? null : Number(place.rating),
    reviewCount: place.reviewCount,
    priceMin: place.priceMin === null ? null : Number(place.priceMin),
    priceMax: place.priceMax === null ? null : Number(place.priceMax),
    typicalDurationMinutes: place.typicalDurationMinutes,
    indoorOutdoor: place.indoorOutdoor,
    categories: place.categories.map(({ category }) => category),
    coverImageUrl: place.images[0]?.url ?? null,
  };
}

@Injectable()
export class PlacesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(query: PlaceListQuery): Promise<PlaceListResponse> {
    const rows = await this.prisma.place.findMany({
      where: { status: 'ACTIVE', deletedAt: null },
      select,
      orderBy: orderBy(query.sort),
      take: query.limit + 1,
      ...(query.cursor
        ? { cursor: { id: decodePlaceCursor(query.cursor) }, skip: 1 }
        : {}),
    });
    const hasNextPage = rows.length > query.limit;
    const page = hasNextPage ? rows.slice(0, query.limit) : rows;
    return {
      data: page.map(toSummary),
      nextCursor: hasNextPage ? encodePlaceCursor(page.at(-1)!.id) : null,
    };
  }
}
