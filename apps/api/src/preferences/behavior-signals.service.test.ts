import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { BehaviorSignalsService } from './behavior-signals.service';

it('records a behavior signal for the authenticated user', async () => {
  const create = vi.fn().mockResolvedValue({ id: 'signal', feedbackType: 'VISITED', createdAt: new Date() });
  const service = new BehaviorSignalsService({ userFeedback: { create } } as unknown as PrismaService);
  await service.record('user-id', { type: 'VISITED', placeId: '00000000-0000-4000-8000-000000000001' });
  expect(create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ userId: 'user-id', feedbackType: 'VISITED' }) }));
});
