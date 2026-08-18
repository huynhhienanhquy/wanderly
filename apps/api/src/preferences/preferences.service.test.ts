import { describe, expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { PreferencesService } from './preferences.service';

describe('PreferencesService', () => {
  it('lists only active interest categories in a stable order', async () => {
    const findMany = vi.fn().mockResolvedValue([]);
    const service = new PreferencesService({ category: { findMany } } as unknown as PrismaService);
    await expect(service.categories()).resolves.toEqual([]);
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: { isActive: true }, orderBy: { name: 'asc' } }));
  });

  it('replaces preferences atomically after validating active categories', async () => {
    const ids = ['11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', '33333333-3333-4333-8333-333333333333'];
    const deleteMany = vi.fn().mockReturnValue('delete');
    const createMany = vi.fn().mockReturnValue('create');
    const transaction = vi.fn().mockResolvedValue([]);
    const service = new PreferencesService({
      category: { count: vi.fn().mockResolvedValue(3) },
      userPreference: { deleteMany, createMany },
      $transaction: transaction,
    } as unknown as PrismaService);
    await expect(service.update('user-1', ids)).resolves.toEqual({ categoryIds: ids });
    expect(transaction).toHaveBeenCalledWith(['delete', 'create']);
    expect(createMany).toHaveBeenCalledWith({ data: ids.map((categoryId) => ({ userId: 'user-1', categoryId, weight: 1, source: 'EXPLICIT' })) });
  });
});
