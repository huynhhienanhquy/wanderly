import { isWeatherSensitiveActivity, type PlaceDetail } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';

export type PlanWeather = 'CLEAR' | 'RAIN' | 'HEAT';

export function weatherIssues(items: LocalPlanItem[], places: Record<string, PlaceDetail>, weather: PlanWeather): string[] {
  if (weather === 'CLEAR') return [];
  return items.flatMap((item) => {
    const type = places[item.id]?.indoorOutdoor;
    if (type && weather === 'RAIN' && isWeatherSensitiveActivity(type)) return [`${item.name} là hoạt động ngoài trời khi mưa.`];
    if (type && weather === 'HEAT' && isWeatherSensitiveActivity(type)) return [`${item.name} là hoạt động ngoài trời khi nắng nóng.`];
    return [];
  });
}
