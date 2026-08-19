import { afterEach, describe, expect, it, vi } from 'vitest';
import { GooglePlacesProvider } from './places-provider';

describe('GooglePlacesProvider', () => {
  afterEach(() => { delete process.env.GOOGLE_PLACES_API_KEY; });

  it('maps and normalizes Google Places results', async () => {
    process.env.GOOGLE_PLACES_API_KEY = 'test-key';
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({ places: [{
      id: 'google-abc12345', displayName: { text: 'Cà Phê Đẹp' }, formattedAddress: 'Hà Nội',
      location: { latitude: 21.02, longitude: 105.85 }, rating: 4.6, userRatingCount: 12,
      priceLevel: 'PRICE_LEVEL_INEXPENSIVE', primaryType: 'coffee_shop',
    }] }), { status: 200 }));

    const result = await new GooglePlacesProvider(fetcher).fetchPlaces();

    expect(result).toEqual([expect.objectContaining({
      providerPlaceId: 'google-abc12345', slug: 'ca-phe-dep-abc12345', priceMin: 50_000,
      priceMax: 150_000, categorySlugs: ['coffee-shop'], indoorOutdoor: 'MIXED',
    })]);
  });
});
