import { describe, expect, it, vi } from 'vitest';
import { buildCreatePlan, saveRemotePlan } from './plan-api';

describe('remote plan persistence', () => {
  it('builds an API payload from the itinerary', () => {
    const input = buildCreatePlan({ title: 'Hà Nội', date: '2026-08-20', budget: '500000', endTime: '18:00', weather: 'CLEAR' }, [
      { id: '00000000-0000-4000-8000-000000000001', slug: 'ho-guom', name: 'Hồ Gươm', startTime: '09:00' },
    ], 2);
    expect(input).toEqual(expect.objectContaining({ title: 'Hà Nội', peopleCount: 2, budget: 500000 }));
    expect(input.items[0]).toEqual(expect.objectContaining({ position: 0, durationMinutes: 90 }));
  });

  it('sends bearer auth and validates the saved plan', async () => {
    const plan = { id: '00000000-0000-4000-8000-000000000002', title: 'Plan', startTime: '2026-08-20T01:00:00.000Z', endTime: '2026-08-20T10:00:00.000Z', peopleCount: 1, budget: null, items: [] };
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(plan) });
    await expect(saveRemotePlan('http://api', 'token', plan, fetcher)).resolves.toEqual(plan);
    expect(fetcher.mock.calls[0]?.[1]?.headers).toEqual(expect.objectContaining({ Authorization: 'Bearer token' }));
  });
});
