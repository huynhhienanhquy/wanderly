import type { PlaceDetail } from '@wanderly/contracts';
import { describe, expect, it } from 'vitest';
import { getReplacementSlotConstraints } from './replacement-constraints';

const items = [
  { id: '1', slug: 'a', name: 'A', startTime: '08:00' },
  { id: '2', slug: 'b', name: 'B', startTime: '10:00' },
  { id: '3', slug: 'c', name: 'C', startTime: '11:30' },
];

const place = (overrides: Partial<PlaceDetail>): PlaceDetail => ({
  latitude: 21,
  longitude: 105,
  priceMin: 100_000,
  typicalDurationMinutes: 120,
  categories: [],
  ...overrides,
} as PlaceDetail);

describe('replacement slot constraints', () => {
  it('derives time, neighboring locations, categories and remaining budget', () => {
    expect(getReplacementSlotConstraints('2', items, {
      '1': place({ latitude: 20, longitude: 104, priceMin: 80_000 }),
      '2': place({ categories: [{ slug: 'food', name: 'Ẩm thực' }] }),
      '3': place({ latitude: 22, longitude: 106, priceMin: 120_000 }),
    }, '18:00', '500000')).toEqual({
      itemId: '2',
      startTime: '10:00',
      endTime: '11:30',
      maxDurationMinutes: 90,
      previousLocation: { latitude: 20, longitude: 104 },
      nextLocation: { latitude: 22, longitude: 106 },
      categorySlugs: ['food'],
      remainingBudget: 300_000,
    });
  });

  it('uses plan end and default duration for the last item', () => {
    const constraints = getReplacementSlotConstraints('3', items, {
      '3': place({ typicalDurationMinutes: null }),
    }, '13:00', '');

    expect(constraints).toMatchObject({
      endTime: '13:00',
      maxDurationMinutes: 60,
      nextLocation: null,
      remainingBudget: null,
    });
  });

  it('returns null when the slot does not exist', () => {
    expect(getReplacementSlotConstraints('missing', items, {}, '18:00', '500000')).toBeNull();
  });
});
