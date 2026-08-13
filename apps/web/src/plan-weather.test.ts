import { describe, expect, it } from 'vitest';
import { weatherIssues } from './plan-weather';

const items = [{ id: '1', slug: 'park', name: 'Park', startTime: '08:00' }];
describe('plan weather', () => {
  it('warns for outdoor places in rain', () => expect(weatherIssues(items, { '1': { indoorOutdoor: 'OUTDOOR' } as never }, 'RAIN')).toHaveLength(1));
  it('does not warn for indoor places', () => expect(weatherIssues(items, { '1': { indoorOutdoor: 'INDOOR' } as never }, 'RAIN')).toEqual([]));
});
