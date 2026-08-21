import { describe, expect, it } from 'vitest';
import { DEFAULT_PLAN_META, parsePlanMeta } from './plan-meta';

describe('plan metadata', () => {
  it('loads saved planner fields', () => {
    expect(parsePlanMeta(JSON.stringify({
      title: 'Một ngày ở Hà Nội',
      date: '2026-08-15',
      budget: '600000',
      endTime: '20:00',
      weather: 'RAIN',
    }))).toEqual({
      title: 'Một ngày ở Hà Nội',
      date: '2026-08-15',
      budget: '600000',
      endTime: '20:00',
      weather: 'RAIN',
    });
  });

  it('uses defaults for invalid or incomplete data', () => {
    expect(parsePlanMeta('{invalid')).toEqual(DEFAULT_PLAN_META);
    expect(parsePlanMeta(JSON.stringify({ title: '', weather: 'STORM' }))).toEqual(DEFAULT_PLAN_META);
  });
});
