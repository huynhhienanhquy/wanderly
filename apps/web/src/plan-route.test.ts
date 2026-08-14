import { describe, expect, it } from 'vitest';
import { buildRouteSummary } from './plan-route';

describe('plan route summary', () => {
  it('keeps timeline order and calculates route distance', () => {
    const summary = buildRouteSummary([
      { id: 'a', name: 'A', latitude: 21.0285, longitude: 105.8542 },
      { id: 'b', name: 'B', latitude: 21.0368, longitude: 105.8347 },
      { id: 'c', name: 'C', latitude: 21.041, longitude: 105.82 },
    ]);

    expect(summary.points.map(({ id }) => id)).toEqual(['a', 'b', 'c']);
    expect(summary.totalDistanceKilometers).toBeGreaterThan(3);
    expect(summary.points.every(({ x, y }) => x >= 28 && x <= 612 && y >= 28 && y <= 252)).toBe(true);
  });

  it('centers a route with one place', () => {
    expect(buildRouteSummary([{ id: 'a', name: 'A', latitude: 21, longitude: 105 }], 640, 280).points[0]).toMatchObject({ x: 320, y: 140 });
  });
});
