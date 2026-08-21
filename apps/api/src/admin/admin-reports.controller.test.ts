import { describe, expect, it, vi } from 'vitest';
import { AdminReportsController } from './admin-reports.controller';

describe('AdminReportsController', () => {
  it('binds moderation to the authenticated admin', async () => {
    const moderate = vi.fn().mockResolvedValue({});
    const controller = new AdminReportsController({ moderate } as never);
    const request = { user: { sub: '11111111-1111-4111-8111-111111111111', role: 'ADMIN' } } as never;
    const reportId = '22222222-2222-4222-8222-222222222222';
    await controller.moderate(request, reportId, { status: 'RESOLVED', hideReview: true });
    expect(moderate).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', reportId, { status: 'RESOLVED', hideReview: true });
  });
});
