import { expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { EventsService } from './events.service';
it('lists only upcoming published events and maps bigint prices', async () => {
  const findMany = vi.fn().mockResolvedValue([{ id: '00000000-0000-4000-8000-000000000001', placeId: null, title: 'Event', description: null, startTime: new Date('2026-09-01T01:00:00Z'), endTime: new Date('2026-09-01T02:00:00Z'), priceMin: 50000n, priceMax: null, bookingUrl: null, status: 'PUBLISHED' }]);
  const result = await new EventsService({ event: { findMany } } as unknown as PrismaService).listPublished();
  expect(result[0]).toMatchObject({ priceMin: 50000, status: 'PUBLISHED' });
  expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ status: 'PUBLISHED' }) }));
});

it('recommends only events matching an interest category', async () => {
  const base = { id: '00000000-0000-4000-8000-000000000001', placeId: null, title: 'Event', description: null, startTime: new Date('2026-09-01T01:00:00Z'), endTime: new Date('2026-09-01T02:00:00Z'), priceMin: 0n, priceMax: null, bookingUrl: null, status: 'PUBLISHED' as const };
  const findMany = vi.fn().mockResolvedValue([
    { ...base, place: { categories: [{ category: { slug: 'art' } }] } },
    { ...base, id: '00000000-0000-4000-8000-000000000002', place: { categories: [{ category: { slug: 'food' } }] } },
  ]);
  const service = new EventsService({ event: { findMany } } as unknown as PrismaService);
  const result = await service.recommend({ date: '2026-09-01', peopleCount: 1, budget: 100000, currency: 'VND', interests: ['art'], excludedCategories: [], travelMode: 'DRIVE', notes: null });
  expect(result.map(({ id }) => id)).toEqual([base.id]);
});
