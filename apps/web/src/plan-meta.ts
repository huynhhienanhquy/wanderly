import type { LocalPlanMeta } from './plan-storage';

export const DEFAULT_PLAN_META: LocalPlanMeta = {
  title: 'Kế hoạch cuối tuần',
  date: '',
  budget: '',
  endTime: '18:00',
  weather: 'CLEAR',
};

export function parsePlanMeta(raw: string | null): LocalPlanMeta {
  try {
    const value: unknown = JSON.parse(raw ?? '{}');
    if (!value || typeof value !== 'object' || Array.isArray(value)) return DEFAULT_PLAN_META;
    const record = value as Record<string, unknown>;
    const weather = record.weather === 'RAIN' || record.weather === 'HEAT' || record.weather === 'CLEAR'
      ? record.weather
      : DEFAULT_PLAN_META.weather;

    return {
      title: typeof record.title === 'string' && record.title.trim() ? record.title : DEFAULT_PLAN_META.title,
      date: typeof record.date === 'string' ? record.date : DEFAULT_PLAN_META.date,
      budget: typeof record.budget === 'string' ? record.budget : DEFAULT_PLAN_META.budget,
      endTime: typeof record.endTime === 'string' ? record.endTime : DEFAULT_PLAN_META.endTime,
      weather,
    };
  } catch {
    return DEFAULT_PLAN_META;
  }
}
