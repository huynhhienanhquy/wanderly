import { isWeatherSensitiveActivity, type PlaceDetail } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';

export type PlanWeather = 'CLEAR' | 'RAIN' | 'HEAT';
export type WeatherConflict = { itemId: string; severity: 'WARNING'; weather: Exclude<PlanWeather, 'CLEAR'>; message: string; suggestion: string };

export function detectWeatherConflicts(items: LocalPlanItem[], places: Record<string, PlaceDetail>, weather: PlanWeather): WeatherConflict[] {
  if (weather === 'CLEAR') return [];
  return items.flatMap((item) => {
    const type = places[item.id]?.indoorOutdoor;
    if (!type || !isWeatherSensitiveActivity(type)) return [];
    const condition = weather === 'RAIN' ? 'mưa' : 'nắng nóng';
    return [{ itemId: item.id, severity: 'WARNING' as const, weather, message: `${item.name} là hoạt động ngoài trời lúc ${item.startTime} khi ${condition}.`, suggestion: 'Đổi sang địa điểm trong nhà hoặc điều chỉnh khung giờ.' }];
  });
}

export function weatherIssues(items: LocalPlanItem[], places: Record<string, PlaceDetail>, weather: PlanWeather): string[] {
  return detectWeatherConflicts(items, places, weather).map(({ message, suggestion }) => `${message} ${suggestion}`);
}
