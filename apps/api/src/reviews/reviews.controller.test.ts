import { describe, expect, it, vi } from 'vitest';
import { ReviewsController } from './reviews.controller';

const request = { user: { sub: '11111111-1111-4111-8111-111111111111', role: 'USER' } } as never;
const placeId = '22222222-2222-4222-8222-222222222222';

describe('ReviewsController', () => {
  it('uses the authenticated subject for upsert', async () => {
    const upsert = vi.fn().mockResolvedValue({});
    const controller = new ReviewsController({ upsert } as never);
    await controller.upsert(request, placeId, { rating: 5, content: 'Tuyệt vời' });
    expect(upsert).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', placeId, { rating: 5, content: 'Tuyệt vời' });
  });
});
