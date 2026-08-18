import { describe, expect, it } from 'vitest';
import { buildBudgetWarning } from './budget-warning';

const estimate = { currency: 'VND', lines: [], byType: { PLACE: 300000, FOOD: 100000, TRANSPORT: 0 }, total: 400000 };
describe('budget warning', () => {
  it('reports overage severity and largest cause', () => expect(buildBudgetWarning(estimate, 300000, [])).toEqual({ severity: 'HIGH', message: 'Vượt 100.000đ (33%). Nhóm chi phí lớn nhất: PLACE 300.000đ.' }));
  it('warns about uncertainty without a false overage', () => expect(buildBudgetWarning({ ...estimate, total: 200000 }, 300000, ['A'])?.severity).toBe('INFO'));
});
