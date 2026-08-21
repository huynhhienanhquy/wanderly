import { describe, expect, it } from 'vitest';
import { addPlanItem, parsePlanItems, sortPlanItems } from './plan-storage';

describe('plan storage', () => {
  it('migrates items without start time', () => {
    expect(parsePlanItems('[{"id":"1","slug":"a","name":"A"}]')[0]?.startTime).toBe('08:00');
  });
  it('sorts items by start time without mutating input', () => {
    const items = parsePlanItems('[{"id":"1","slug":"a","name":"A","startTime":"10:00"},{"id":"2","slug":"b","name":"B","startTime":"08:00"}]');
    expect(sortPlanItems(items).map(({ id }) => id)).toEqual(['2', '1']);
    expect(items[0]?.id).toBe('1');
  });
  it('adds at the selected time and rejects duplicates', () => {
    const item = { id: '1', slug: 'a', name: 'A', startTime: '10:00' };
    expect(addPlanItem([], item)).toEqual({ items: [item], added: true });
    expect(addPlanItem([item], item).added).toBe(false);
  });
});
