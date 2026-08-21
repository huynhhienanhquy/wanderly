import type { RankedCandidate } from '@wanderly/contracts';
import { describe, expect, it } from 'vitest';
import { weatherSuitableReplacements } from './weather-replacements';

const candidate = (id: string, environment: 'INDOOR' | 'OUTDOOR' | 'MIXED', score: number) => ({
  place: { id, indoorOutdoor: environment }, score, reason: 'Điểm phù hợp.',
} as RankedCandidate);

describe('weather replacement suggestions', () => {
  const candidates = [candidate('mixed', 'MIXED', 0.9), candidate('outdoor', 'OUTDOOR', 0.95), candidate('indoor', 'INDOOR', 0.8)];

  it('prioritizes indoor and removes outdoor candidates in bad weather', () => {
    const result = weatherSuitableReplacements(candidates, 'RAIN');
    expect(result.map(({ place }) => place.id)).toEqual(['indoor', 'mixed']);
    expect(result[0]?.reason).toContain('trong nhà phù hợp khi trời mưa');
  });

  it('preserves recommendation ranking in clear weather', () => {
    expect(weatherSuitableReplacements(candidates, 'CLEAR')).toBe(candidates);
  });
});
