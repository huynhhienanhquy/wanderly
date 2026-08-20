import { describe, expect, it } from 'vitest';
import { candidatesToPlan } from './ai-plan';

describe('AI plan generation', () => {
  it('turns ranked candidates into a bounded chronological itinerary', () => {
    const candidates = Array.from({ length: 6 }, (_, index) => ({
      place: { id: `id-${index}`, slug: `place-${index}`, name: `Place ${index}` },
    })) as never;
    expect(candidatesToPlan(candidates, 9).map(({ slug, startTime }) => ({ slug, startTime }))).toEqual([
      { slug: 'place-0', startTime: '09:00' }, { slug: 'place-1', startTime: '11:00' },
      { slug: 'place-2', startTime: '13:00' }, { slug: 'place-3', startTime: '15:00' },
    ]);
  });
});
