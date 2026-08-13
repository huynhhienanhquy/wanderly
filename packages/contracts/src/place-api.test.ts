import { describe, expect, it, vi } from 'vitest';
import {
  fetchPlaceDetail,
  fetchPlacePage,
  formatPlacePrice,
} from './place-api';

describe('place API client', () => {
  it('builds a paginated URL and validates the response', async () => {
    const fetcher = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ data: [], nextCursor: null }), {
        status: 200,
      }),
    );
    await expect(
      fetchPlacePage(
        'http://localhost:4000',
        { cursor: 'next', limit: 8, sort: 'rating' },
        fetcher,
      ),
    ).resolves.toEqual({ data: [], nextCursor: null });
    expect(fetcher).toHaveBeenCalledWith(
      'http://localhost:4000/places?limit=8&sort=rating&cursor=next',
    );
  });

  it('throws for HTTP errors and formats common price states', async () => {
    await expect(
      fetchPlacePage(
        'http://localhost:4000',
        {},
        vi.fn().mockResolvedValue(new Response(null, { status: 503 })),
      ),
    ).rejects.toThrow('503');
    expect(formatPlacePrice(null, null)).toBe('Chưa có giá');
    expect(formatPlacePrice(0, 0)).toBe('Miễn phí');
    expect(formatPlacePrice(50000, 150000)).toBe('50k – 150k');
  });

  it('fetches and validates place detail by slug', async () => {
    const detail = {
      id: '00000000-0000-4000-8000-000000000001',
      slug: 'pho-24',
      name: 'Phở 24',
      city: 'Hà Nội',
      district: null,
      address: '1 Phố Huế',
      description: null,
      latitude: 21,
      longitude: 105,
      priceMin: 0,
      priceMax: 0,
      rating: 4.5,
      reviewCount: 10,
      typicalDurationMinutes: null,
      indoorOutdoor: 'MIXED',
      categories: [],
      coverImageUrl: null,
      countryCode: 'VN',
      images: [],
      openingHours: [],
    };
    const fetcher = vi
      .fn()
      .mockResolvedValue(new Response(JSON.stringify(detail), { status: 200 }));
    await expect(
      fetchPlaceDetail('http://localhost:4000', 'pho-24', fetcher),
    ).resolves.toEqual(detail);
    expect(fetcher).toHaveBeenCalledWith('http://localhost:4000/places/pho-24');
  });
});
