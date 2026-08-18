import { describe, expect, it } from 'vitest';
import { planningConstraintsSchema } from './planner';

describe('planningConstraintsSchema', () => {
  it('applies safe defaults to the minimum planning request', () => {
    expect(planningConstraintsSchema.parse({ peopleCount: 2 })).toEqual({
      peopleCount: 2, budget: null, currency: 'VND', interests: [],
      excludedCategories: [], travelMode: 'DRIVE', notes: null,
    });
  });

  it('rejects an end time that is not later than the start time', () => {
    expect(planningConstraintsSchema.safeParse({ peopleCount: 1, startTime: '18:00', endTime: '17:00' }).success).toBe(false);
  });
});
