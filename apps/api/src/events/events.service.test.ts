import { expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { EventsService } from './events.service';
it('lists only upcoming published events and maps bigint prices', async () => {
  const findMany = vi.fn().mockResolvedValue([{ id: '00000000-0000-4000-8000-000000000001', placeId: null, title: 'Event', description: null, startTime: new Date('2026-09-01T01:00:00Z'), endTime: new Date('2026-09-01T02:00:00Z'), priceMin: 50000n, priceMax: null, bookingUrl: null, status: 'PUBLISHED' }]);
  const result = await new EventsService({ event: { findMany } } as unknown as PrismaService).listPublished();
  expect(result[0]).toMatchObject({ priceMin: 50000, status: 'PUBLISHED' });
  expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ status: 'PUBLISHED' }) }));
});
