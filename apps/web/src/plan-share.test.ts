import { describe, expect, it } from 'vitest';
import { decodeSharedPlan, encodeSharedPlan, type SharedPlan } from './plan-share';

describe('plan sharing', () => {
  it('round-trips a shared plan snapshot', () => {
    const plan: SharedPlan = {
      meta: { title: 'Cuối tuần', date: '2026-08-15', budget: '500000', endTime: '18:00', weather: 'CLEAR' },
      items: [{ id: '1', slug: 'ho-guom', name: 'Hồ Gươm', startTime: '09:00' }],
    };

    expect(decodeSharedPlan(encodeSharedPlan(plan))).toEqual(plan);
  });

  it('rejects invalid shared plan data', () => {
    expect(decodeSharedPlan(null)).toBeNull();
    expect(decodeSharedPlan('{invalid')).toBeNull();
    expect(decodeSharedPlan(JSON.stringify({ meta: {}, items: [] }))).toBeNull();
  });
});
