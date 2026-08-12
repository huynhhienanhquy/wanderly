import { Injectable, NotFoundException } from '@nestjs/common';
import type {
  PlaceListQuery,
  PlaceListResponse,
  PlaceSummary,
  PlaceDetail,
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

const detailSelect = {
  ...select,
  countryCode: true,
  images: {
    orderBy: [{ isCover: 'desc' }, { sortOrder: 'asc' }],
    select: { url: true, attribution: true, isCover: true, sortOrder: true },
  },
  openingHours: {
    orderBy: { dayOfWeek: 'asc' },
    select: {
      dayOfWeek: true,
      openTime: true,
      closeTime: true,
      isClosed: true,
      validFrom: true,
      validTo: true,
    },
  },
} satisfies Prisma.PlaceSelect;

type PlaceDetailRow = Prisma.PlaceGetPayload<{ select: typeof detailSelect }>;

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

function formatTime(value: Date | null): string | null {
  if (value === null) return null;
  return `${value.getUTCHours().toString().padStart(2, '0')}:${value.getUTCMinutes().toString().padStart(2, '0')}`;
}

function formatDate(value: Date | null): string | null {
  return value?.toISOString().slice(0, 10) ?? null;
}

function toDetail(place: PlaceDetailRow): PlaceDetail {
  return {
    ...toSummary(place),
    countryCode: place.countryCode,
    coverImageUrl: place.images.find(({ isCover }) => isCover)?.url ?? null,
    images: place.images,
    openingHours: place.openingHours.map((period) => ({
      dayOfWeek: period.dayOfWeek,
      open: formatTime(period.openTime),
      close: formatTime(period.closeTime),
      isClosed: period.isClosed,
      validFrom: formatDate(period.validFrom),
      validTo: formatDate(period.validTo),
    })),
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

  async detail(slug: string): Promise<PlaceDetail> {
    const place = await this.prisma.place.findFirst({
      where: { slug, status: 'ACTIVE', deletedAt: null },
      select: detailSelect,
    });
    if (!place) throw new NotFoundException('Không tìm thấy địa điểm.');
    return toDetail(place);
  }
}
