import type { PlaceDetail, RankedCandidate } from '@wanderly/contracts';
import { describe, expect, it } from 'vitest';
import { previewReplacement } from './replacement-preview';

const items = [
  { id: '1', slug: 'a', name: 'A', startTime: '08:00' },
  { id: '2', slug: 'b', name: 'B', startTime: '10:00' },
];
const detail = (id: string, price: number): PlaceDetail => ({
  id, slug: id, name: id, description: null, address: 'Hà Nội', district: null,
  city: 'Hà Nội', countryCode: 'VN', latitude: 21, longitude: 105, rating: 4,
  reviewCount: 0, priceMin: price, priceMax: price, typicalDurationMinutes: 60,
  indoorOutdoor: 'INDOOR', categories: [], coverImageUrl: null, images: [], openingHours: [],
});
const candidate = {
  place: { ...detail('00000000-0000-4000-8000-000000000003', 150_000), longitude: 105.02 },
  score: 0.9, components: { preference: 1, distance: 1, rating: 1, budget: 1, popularity: 1 }, reason: 'Phù hợp.',
} as RankedCandidate;

describe('replacement impact preview', () => {
  it('recalculates route, duration and budget without mutating the original plan', () => {
    const preview = previewReplacement('2', candidate, items, {
      '1': detail('1', 100_000), '2': detail('2', 80_000),
    }, '12:00', '300000');

    expect(preview).toMatchObject({
      budgetTotal: 250_000,
      budgetExceededBy: 0,
      durationMinutes: 125,
      impact: { durationMinutesDelta: 4, budgetDelta: 70_000 },
      valid: true,
      issues: [],
    });
    expect(preview?.routeKilometers).toBeGreaterThan(2);
    expect(items[1]?.id).toBe('2');
  });

  it('marks a preview invalid when the new plan exceeds budget', () => {
    const preview = previewReplacement('2', candidate, items, {
      '1': detail('1', 100_000), '2': detail('2', 80_000),
    }, '12:00', '200000');

    expect(preview?.valid).toBe(false);
    expect(preview?.budgetExceededBy).toBe(50_000);
    expect(preview?.issues).toEqual(['Vượt ngân sách 50.000đ.']);
  });
});
