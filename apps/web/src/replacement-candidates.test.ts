import { describe, expect, it, vi } from 'vitest';
import { buildReplacementCandidateRequest, fetchReplacementCandidates } from './replacement-candidates';
import type { ReplacementSlotConstraints } from './replacement-constraints';

const slot: ReplacementSlotConstraints = {
  itemId: 'old', startTime: '10:00', endTime: '11:30', maxDurationMinutes: 90,
  previousLocation: { latitude: 21, longitude: 105 }, nextLocation: null,
  categorySlugs: ['food'], remainingBudget: 250_000,
};

const candidate = (id: string, slug: string, duration: number) => ({
  place: {
    id, slug, name: slug, description: null, address: 'Hà Nội', district: null,
    city: 'Hà Nội', latitude: 21, longitude: 105, rating: 4.5, reviewCount: 10,
    priceMin: 100_000, priceMax: 150_000, typicalDurationMinutes: duration,
    indoorOutdoor: 'INDOOR', categories: [{ slug: 'food', name: 'Ẩm thực' }], coverImageUrl: null,
  },
  score: 0.8,
  components: { preference: 1, distance: 1, rating: 0.9, budget: 0.6, popularity: 0.5 },
  reason: 'Phù hợp ẩm thực và ở gần.',
});

describe('replacement candidates', () => {
  it('maps slot constraints to recommendation constraints', () => {
    expect(buildReplacementCandidateRequest(slot, '2026-08-20', 5)).toMatchObject({
      limit: 5,
      constraints: {
        date: '2026-08-20', startTime: '10:00', endTime: '11:30', budget: 250_000,
        interests: ['food'], startLocation: { latitude: 21, longitude: 105 }, maxTravelRadiusMeters: 10_000,
      },
    });
  });

  it('keeps ranked candidates that fit duration and are not already in the plan', async () => {
    const existingId = '00000000-0000-4000-8000-000000000001';
    const fetcher = vi.fn().mockResolvedValue(new Response(JSON.stringify({
      data: [
        candidate(existingId, 'existing', 60),
        candidate('00000000-0000-4000-8000-000000000002', 'fit', 90),
        candidate('00000000-0000-4000-8000-000000000003', 'long', 120),
      ],
    }), { status: 200, headers: { 'content-type': 'application/json' } }));

    const result = await fetchReplacementCandidates('http://api', slot, '2026-08-20', [existingId], fetcher);

    expect(result.map(({ place }) => place.slug)).toEqual(['fit']);
    expect(fetcher).toHaveBeenCalledOnce();
  });
});
