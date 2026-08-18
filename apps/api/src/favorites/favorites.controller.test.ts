import { describe, expect, it, vi } from 'vitest';
import { FavoritesController } from './favorites.controller';

const request = { user: { sub: '11111111-1111-4111-8111-111111111111', role: 'USER' } } as never;
const placeId = '22222222-2222-4222-8222-222222222222';

describe('FavoritesController', () => {
  it('uses the authenticated subject for favorite operations', async () => {
    const add = vi.fn().mockResolvedValue({ id: placeId, slug: 'place' });
    const remove = vi.fn().mockResolvedValue(undefined);
    const controller = new FavoritesController({ add, remove } as never);

    await controller.add(request, placeId);
    await expect(controller.remove(request, placeId)).resolves.toEqual({ success: true });

    expect(add).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', placeId);
    expect(remove).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', placeId);
  });
});
