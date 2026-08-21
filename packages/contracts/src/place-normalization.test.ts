import { describe, expect, it } from 'vitest';
import { normalizePlaceInput } from './place-normalization';

const validInput = {
  name: '  Demo Place  ',
  slug: 'demo-place',
  description: ' Demo ',
  address: ' 1 Demo Street ',
  district: 'Demo',
  city: 'Hà Nội',
  countryCode: 'vn',
  latitude: '21.0285',
  longitude: 105.8542,
  rating: '4.7',
  reviewCount: '12',
  priceMin: '50000',
  priceMax: 120000,
  typicalDurationMinutes: '90',
  indoorOutdoor: 'MIXED',
  categorySlugs: ['food', 'cafe'],
  images: [
    { url: 'https://example.com/second.jpg', sortOrder: 2 },
    { url: 'https://example.com/cover.jpg', isCover: true, sortOrder: 0 },
  ],
  openingHours: [
    { dayOfWeek: 1, open: '08:00', close: '22:00' },
    { dayOfWeek: 0, open: null, close: null, isClosed: true },
  ],
};

describe('normalizePlaceInput', () => {
  it('trims text, normalizes country code/numbers and sorts nested data', () => {
    const place = normalizePlaceInput(validInput);
    expect(place).toMatchObject({
      name: 'Demo Place',
      description: 'Demo',
      countryCode: 'VN',
      latitude: 21.0285,
      rating: 4.7,
      categorySlugs: ['cafe', 'food'],
    });
    expect(place.images.map(({ sortOrder }) => sortOrder)).toEqual([0, 2]);
    expect(place.openingHours.map(({ dayOfWeek }) => dayOfWeek)).toEqual([
      0, 1,
    ]);
  });

  it('rejects invalid coordinates and inverted prices', () => {
    expect(() =>
      normalizePlaceInput({
        ...validInput,
        latitude: 91,
        priceMin: 200000,
        priceMax: 100000,
      }),
    ).toThrow();
  });

  it('rejects duplicate categories, days and cover images', () => {
    expect(() =>
      normalizePlaceInput({ ...validInput, categorySlugs: ['cafe', 'cafe'] }),
    ).toThrow();
    expect(() =>
      normalizePlaceInput({
        ...validInput,
        openingHours: [validInput.openingHours[0], validInput.openingHours[0]],
      }),
    ).toThrow();
    expect(() =>
      normalizePlaceInput({
        ...validInput,
        images: [
          { url: 'https://example.com/a.jpg', isCover: true },
          { url: 'https://example.com/b.jpg', isCover: true },
        ],
      }),
    ).toThrow();
  });
});
