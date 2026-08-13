import { describe, expect, it } from 'vitest';
import { validateDurations } from './plan-duration';

const items = [
  { id: '1', slug: 'a', name: 'A', startTime: '08:00' },
  { id: '2', slug: 'b', name: 'B', startTime: '09:00' },
];

describe('plan duration validation', () => {
  it('detects overlap and end-time overflow', () => {
    const result = validateDurations(items, { '1': 90, '2': 120 }, '10:00');
    expect(result.totalMinutes).toBe(210);
    expect(result.issues).toHaveLength(2);
  });
  it('reports missing duration', () => expect(validateDurations(items.slice(0, 1), {}, '') .issues).toEqual(['A chưa có thời lượng.']));
});
