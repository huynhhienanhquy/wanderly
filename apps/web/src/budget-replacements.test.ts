import type { RankedCandidate } from '@wanderly/contracts';
import { describe, expect, it } from 'vitest';
import { cheaperReplacementCandidates } from './budget-replacements';

const candidate = (id: string, priceMin: number | null, score: number) => ({
  place: { id, priceMin }, score, reason: 'Phù hợp sở thích.',
} as RankedCandidate);

describe('budget replacement suggestions', () => {
  it('keeps cheaper candidates and ranks by savings then match score', () => {
    const result = cheaperReplacementCandidates([
      candidate('same', 200_000, 1),
      candidate('save-most-low-score', 80_000, 0.7),
      candidate('save-most-high-score', 80_000, 0.9),
      candidate('unknown', null, 1),
      candidate('save-less', 150_000, 1),
    ], 200_000);

    expect(result.map(({ place }) => place.id)).toEqual(['save-most-high-score', 'save-most-low-score', 'save-less']);
    expect(result[0]).toMatchObject({ savings: 120_000 });
    expect(result[0]?.reason).toContain('120.000đ');
  });

  it('does not guess savings when the current price is unavailable', () => {
    expect(cheaperReplacementCandidates([candidate('cheap', 50_000, 1)], null)).toEqual([]);
  });
});
