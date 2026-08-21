import { describe, expect, it } from 'vitest';
import { isOpenAt } from './plan-opening-hours';

const monday = [{ dayOfWeek: 1, open: '09:00', close: '18:00', isClosed: false, validFrom: null, validTo: null }];

describe('plan opening hours', () => {
  it('accepts a time inside the opening period', () => expect(isOpenAt(monday, '2026-08-10', '10:00')).toBe(true));
  it('rejects a time outside the opening period', () => expect(isOpenAt(monday, '2026-08-10', '19:00')).toBe(false));
  it('returns unknown when no schedule exists', () => expect(isOpenAt([], '2026-08-10', '10:00')).toBeNull());
});
