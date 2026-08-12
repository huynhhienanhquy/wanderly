import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { decodePlaceCursor } from './place-cursor';
import { PlacesService } from './places.service';

const row = (id: string, name: string) => ({
  id,
  slug: name.toLowerCase().replaceAll(' ', '-'),
  name,
  description: null,
  address: 'Demo address',
  district: null,
  city: 'Hà Nội',
  latitude: 21.02,
  longitude: 105.85,
  rating: 4.5,
  reviewCount: 10,
  priceMin: BigInt(50000),
  priceMax: BigInt(100000),
  typicalDurationMinutes: 90,
  indoorOutdoor: 'MIXED',
  categories: [{ category: { slug: 'cafe', name: 'Cà phê' } }],
  images: [],
});

describe('PlacesService', () => {
  it('returns a bounded page and cursor without leaking Prisma numeric types', async () => {
    const rows = [
      row('3307daba-1408-4f44-b361-800e6b8d22ac', 'First'),
      row('b841a593-0cc8-4ee7-bef6-bace4b547917', 'Second'),
      row('5a30fcbc-5d9b-4c88-bbe2-a90da056cc72', 'Third'),
    ];
    const findMany = vi.fn().mockResolvedValue(rows);
    const service = new PlacesService({
      place: { findMany },
    } as unknown as PrismaService);

    const result = await service.list({ limit: 2, sort: 'popular' });

    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toMatchObject({
      priceMin: 50000,
      categories: [{ slug: 'cafe', name: 'Cà phê' }],
      coverImageUrl: null,
    });
    expect(decodePlaceCursor(result.nextCursor!)).toBe(rows[1]!.id);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        take: 3,
        where: { status: 'ACTIVE', deletedAt: null },
      }),
    );
  });

  it('uses the decoded cursor and returns null at the final page', async () => {
    const id = '3307daba-1408-4f44-b361-800e6b8d22ac';
    const findMany = vi.fn().mockResolvedValue([row(id, 'Only')]);
    const service = new PlacesService({
      place: { findMany },
    } as unknown as PrismaService);
    const cursor = Buffer.from(JSON.stringify({ id })).toString('base64url');

    const result = await service.list({ cursor, limit: 20, sort: 'newest' });

    expect(result.nextCursor).toBeNull();
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({ cursor: { id }, skip: 1 }),
    );
  });

  it('maps full detail including ordered images and opening hours', async () => {
    const place = {
      ...row('3307daba-1408-4f44-b361-800e6b8d22ac', 'Detail'),
      countryCode: 'VN',
      images: [
        {
          url: 'https://example.com/cover.jpg',
          attribution: 'Demo',
          isCover: true,
          sortOrder: 0,
        },
      ],
      openingHours: [
        {
          dayOfWeek: 1,
          openTime: new Date('1970-01-01T08:30:00.000Z'),
          closeTime: new Date('1970-01-01T22:00:00.000Z'),
          isClosed: false,
          validFrom: null,
          validTo: null,
        },
      ],
    };
    const findFirst = vi.fn().mockResolvedValue(place);
    const service = new PlacesService({
      place: { findFirst },
    } as unknown as PrismaService);
    const result = await service.detail('detail');
    expect(result).toMatchObject({
      countryCode: 'VN',
      coverImageUrl: 'https://example.com/cover.jpg',
      openingHours: [
        { dayOfWeek: 1, open: '08:30', close: '22:00', isClosed: false },
      ],
    });
    expect(findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { slug: 'detail', status: 'ACTIVE', deletedAt: null },
      }),
    );
  });

  it('does not expose inactive, deleted or missing places', async () => {
    const service = new PlacesService({
      place: { findFirst: vi.fn().mockResolvedValue(null) },
    } as unknown as PrismaService);
    await expect(service.detail('missing')).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
