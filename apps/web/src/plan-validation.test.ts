import { describe, expect, it } from 'vitest';
import { finalPlanIssues } from './plan-validation';

describe('final plan validation', () => {
  it('rejects an empty plan', () => expect(finalPlanIssues([], 0)).toEqual(['Kế hoạch chưa có địa điểm.']));
  it('deduplicates constraint issues', () => expect(finalPlanIssues([['Lỗi'], ['Lỗi']], 1)).toEqual(['Lỗi']));
});
