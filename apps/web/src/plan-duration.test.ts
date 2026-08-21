import { describe, expect, it } from 'vitest';
import { distanceKilometers, estimateTravelMinutes, validateDurations } from './plan-duration';

const items = [
  { id: '1', slug: 'a', name: 'A', startTime: '08:00' },
  { id: '2', slug: 'b', name: 'B', startTime: '09:00' },
];

describe('plan duration validation', () => {
  it('estimates travel time between consecutive places', () => {
    const locations = {
      '1': { latitude: 21.0285, longitude: 105.8542 },
      '2': { latitude: 21.0368, longitude: 105.8347 },
    };
    const travelMinutes = estimateTravelMinutes(locations['1'], locations['2']);
    const result = validateDurations(items, { '1': 45, '2': 60 }, '11:00', locations);

    expect(distanceKilometers(locations['1'], locations['2'])).toBeGreaterThan(2);
    expect(result).toEqual({
      activityMinutes: 105,
      travelMinutes,
      totalMinutes: 105 + travelMinutes,
      issues: [],
    });
  });

  it('detects insufficient time and end-time overflow', () => {
    const result = validateDurations(items, { '1': 90, '2': 120 }, '10:00');
    expect(result).toEqual({
      activityMinutes: 210,
      travelMinutes: 0,
      totalMinutes: 210,
      issues: ['A không đủ thời gian hoạt động và di chuyển tới B.', 'B kết thúc sau khung kế hoạch.'],
    });
  });

  it('reports missing duration', () => {
    expect(validateDurations(items.slice(0, 1), {}, '')).toEqual({
      activityMinutes: 0,
      travelMinutes: 0,
      totalMinutes: 0,
      issues: ['A chưa có thời lượng.'],
    });
  });
});
