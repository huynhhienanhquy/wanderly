import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import type { PlacesProvider } from './places-provider';
import { PlacesSyncService } from './places-sync.service';

describe('PlacesSyncService', () => {
  it('upserts normalized places by stable provider identity', async () => {
    const provider = { fetchPlaces: vi.fn().mockResolvedValue([{
      providerPlaceId: 'google-1', name: 'Place', slug: 'place-google1', description: null,
      address: 'Hà Nội', district: null, city: 'Hà Nội', countryCode: 'VN', latitude: 21,
      longitude: 105, rating: 4, reviewCount: 10, priceMin: 50_000, priceMax: 100_000,
      typicalDurationMinutes: 60, indoorOutdoor: 'MIXED', categorySlugs: ['cafe'], images: [], openingHours: [],
    }]), name: 'test-places', execute: vi.fn() } as PlacesProvider;
    const upsert = vi.fn().mockResolvedValue({ id: 'place-id' });
    const service = new PlacesSyncService(provider, { place: { upsert } } as unknown as PrismaService);

    await expect(service.sync()).resolves.toEqual({ createdOrUpdated: 1 });
    expect(upsert).toHaveBeenCalledWith(expect.objectContaining({
      where: { provider_providerPlaceId: { provider: 'GOOGLE', providerPlaceId: 'google-1' } },
      create: expect.objectContaining({ provider: 'GOOGLE', providerPlaceId: 'google-1', status: 'ACTIVE' }),
    }));
  });
});
