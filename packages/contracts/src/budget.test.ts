import { describe, expect, it } from 'vitest';
import { estimateBudget } from './budget';

describe('budget estimate', () => {
  it('calculates place, food and transport breakdown', () => {
    const result = estimateBudget([
      { type: 'PLACE', label: 'Vé', unitAmount: 100000, quantity: 2 },
      { type: 'FOOD', label: 'Ăn trưa', unitAmount: 150000 },
      { type: 'TRANSPORT', label: 'Taxi', unitAmount: 80000 },
    ]);
    expect(result.byType).toEqual({ PLACE: 200000, FOOD: 150000, TRANSPORT: 80000 });
    expect(result.total).toBe(430000);
  });
  it('rejects negative costs', () => expect(() => estimateBudget([{ type: 'PLACE', label: 'Vé', unitAmount: -1 }])).toThrow());
});
