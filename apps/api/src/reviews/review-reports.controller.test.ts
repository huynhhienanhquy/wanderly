import { describe, expect, it, vi } from 'vitest';
import { ReviewReportsController } from './review-reports.controller';

describe('ReviewReportsController', () => {
  it('binds a report to the authenticated reporter', async () => {
    const create = vi.fn().mockResolvedValue({});
    const controller = new ReviewReportsController({ create } as never);
    const request = { user: { sub: '11111111-1111-4111-8111-111111111111', role: 'USER' } } as never;
    const reviewId = '22222222-2222-4222-8222-222222222222';
    await controller.create(request, reviewId, { reason: 'Nội dung không phù hợp' });
    expect(create).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', reviewId, 'Nội dung không phù hợp');
  });
});
