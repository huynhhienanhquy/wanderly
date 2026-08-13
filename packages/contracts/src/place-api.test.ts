import { describe, expect, it, vi } from 'vitest';
import { fetchPlacePage, formatPlacePrice } from './place-api';

describe('place API client', () => {
  it('builds a paginated URL and validates the response', async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValue(
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
});
