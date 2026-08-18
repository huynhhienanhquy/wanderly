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
});
