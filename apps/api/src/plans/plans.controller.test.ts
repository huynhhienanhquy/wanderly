import { describe, expect, it, vi } from 'vitest';
import { PlansController } from './plans.controller';

const request = { user: { sub: '11111111-1111-4111-8111-111111111111', role: 'USER' } } as never;

describe('PlansController', () => {
  it('uses the authenticated subject when listing plans', async () => {
    const list = vi.fn().mockResolvedValue([]);
    const controller = new PlansController({ list } as never);
    await controller.list(request);
    expect(list).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111');
  });

  it('uses the authenticated subject when removing a plan', async () => {
    const remove = vi.fn().mockResolvedValue(undefined);
    const controller = new PlansController({ remove } as never);
    await expect(controller.remove(request, '22222222-2222-4222-8222-222222222222')).resolves.toEqual({ success: true });
    expect(remove).toHaveBeenCalledWith('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222');
  });
});
