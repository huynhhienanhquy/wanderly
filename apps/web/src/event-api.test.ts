import { expect, it, vi } from 'vitest';
import { fetchEvents } from './event-api';
it('loads and validates published events', async () => {
  const events = [{ id: '00000000-0000-4000-8000-000000000001', placeId: null, title: 'Event', description: null, startTime: '2026-09-01T01:00:00.000Z', endTime: '2026-09-01T02:00:00.000Z', priceMin: 0, priceMax: null, bookingUrl: null, status: 'PUBLISHED' }];
  const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(events) });
  await expect(fetchEvents('http://api', fetcher)).resolves.toEqual(events);
});
