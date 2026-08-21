import { describe, expect, it } from 'vitest';
import { estimatePlanBudget } from './plan-budget';

const items = [{ id: '1', slug: 'a', name: 'A', startTime: '08:00' }];

describe('plan budget', () => {
  it('calculates the exceeded amount', () => {
    const result = estimatePlanBudget(items, { '1': { priceMin: 120000 } as never }, '100000');
    expect(result).toMatchObject({ total: 120000, exceededBy: 20000 });
  });
  it('reports missing prices', () => expect(estimatePlanBudget(items, {}, '').missing).toEqual(['A']));
  it('provides line and category breakdowns', () => {
    const result = estimatePlanBudget(items, { '1': { priceMin: 80000, categories: [{ slug: 'food' }] } as never }, '');
    expect(result.lines).toEqual([{ type: 'FOOD', label: 'A', unitAmount: 80000, quantity: 1, amount: 80000 }]);
    expect(result.byType).toEqual({ PLACE: 0, FOOD: 80000, TRANSPORT: 0 });
  });
});
