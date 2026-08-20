import { expect, it, vi } from 'vitest';
import type { PrismaService } from '../database/prisma.service';
import { PreferenceLearningService } from './preference-learning.service';

it('aggregates behavior by place category and clamps learned weights', async () => {
  const upsert = vi.fn();
  const transaction = vi.fn().mockResolvedValue([]);
  const prisma = {
    userFeedback: { findMany: vi.fn().mockResolvedValue([
      { feedbackType: 'LOVED', place: { categories: [{ categoryId: 'cafe' }] } },
      { feedbackType: 'VISITED', place: { categories: [{ categoryId: 'cafe' }, { categoryId: 'art' }] } },
      { feedbackType: 'DISLIKED', place: { categories: [{ categoryId: 'art' }] } },
    ]) },
    userPreference: { upsert }, $transaction: transaction,
  } as unknown as PrismaService;
  const result = await new PreferenceLearningService(prisma).recalculate('user');
  expect(result).toEqual({ updatedCategories: 2 });
  expect(upsert).toHaveBeenCalledWith(expect.objectContaining({ create: expect.objectContaining({ categoryId: 'cafe', weight: 0.66, source: 'LEARNED' }) }));
  expect(transaction).toHaveBeenCalledOnce();
});
