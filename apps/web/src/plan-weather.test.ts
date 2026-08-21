import { describe, expect, it } from 'vitest';
import { detectWeatherConflicts, weatherIssues } from './plan-weather';

const items = [{ id: '1', slug: 'park', name: 'Park', startTime: '08:00' }];
describe('plan weather', () => {
  it('warns for outdoor places in rain', () => expect(weatherIssues(items, { '1': { indoorOutdoor: 'OUTDOOR' } as never }, 'RAIN')).toHaveLength(1));
  it('does not warn for indoor places', () => expect(weatherIssues(items, { '1': { indoorOutdoor: 'INDOOR' } as never }, 'RAIN')).toEqual([]));
  it('returns an actionable conflict tied to the plan item', () => expect(detectWeatherConflicts(items, { '1': { indoorOutdoor: 'OUTDOOR' } as never }, 'HEAT')).toEqual([{ itemId: '1', severity: 'WARNING', weather: 'HEAT', message: 'Park là hoạt động ngoài trời lúc 08:00 khi nắng nóng.', suggestion: 'Đổi sang địa điểm trong nhà hoặc điều chỉnh khung giờ.' }]));
  it('allows mixed places to move activity indoors', () => expect(detectWeatherConflicts(items, { '1': { indoorOutdoor: 'MIXED' } as never }, 'RAIN')).toEqual([]));
});
