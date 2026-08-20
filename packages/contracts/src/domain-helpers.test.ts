import { describe, expect, it } from 'vitest';
import { formatDuration, formatMoney, getPlanDurationMinutes, isValidPlanWindow, normalizeConstraintTags } from './domain-helpers';

describe('domain helpers', () => {
  it('formats money and durations for shared client display', () => {
    expect(formatMoney(250000, 'VND', 'vi-VN')).toContain('250.000');
    expect([formatDuration(45), formatDuration(120), formatDuration(155)]).toEqual([
      '45 phút', '2 giờ', '2 giờ 35 phút',
    ]);
  });

  it('validates and measures a plan window', () => {
    const start = '2026-08-20T08:00:00.000Z';
    const end = '2026-08-20T10:30:00.000Z';
    expect({ valid: isValidPlanWindow(start, end), minutes: getPlanDurationMinutes(start, end) })
      .toEqual({ valid: true, minutes: 150 });
    expect(isValidPlanWindow(end, start)).toBe(false);
  });

  it('normalizes constraint tags deterministically', () => {
    expect(normalizeConstraintTags([' Indoor ', 'FOOD', 'indoor', ''])).toEqual(['food', 'indoor']);
  });
});
