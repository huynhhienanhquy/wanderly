import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const PLAN_KEY = 'wanderlyCurrentPlan';

export type MobilePlanItem = {
  id: string;
  slug: string;
  name: string;
  startTime: string;
  priceMin: number | null;
  latitude: number;
  longitude: number;
};

export type MobilePlan = {
  title: string;
  date: string;
  budget: number | null;
  peopleCount: number;
  items: MobilePlanItem[];
};

function isMobilePlan(value: unknown): value is MobilePlan {
  if (!value || typeof value !== 'object') return false;
  const plan = value as Partial<MobilePlan>;
  return typeof plan.title === 'string' && typeof plan.date === 'string'
    && typeof plan.peopleCount === 'number' && Array.isArray(plan.items)
    && plan.items.every((item) => item && typeof item.id === 'string' && typeof item.slug === 'string'
      && typeof item.name === 'string' && typeof item.startTime === 'string'
      && typeof item.latitude === 'number' && typeof item.longitude === 'number');
}

export function removeMobilePlanItem(plan: MobilePlan, id: string): MobilePlan {
  return { ...plan, items: plan.items.filter((item) => item.id !== id) };
}

export function replaceMobilePlanItem(plan: MobilePlan, id: string, replacement: MobilePlanItem): MobilePlan {
  const current = plan.items.find((item) => item.id === id);
  if (!current) return plan;
  if (replacement.id !== id && plan.items.some((item) => item.id === replacement.id)) return plan;
  return { ...plan, items: plan.items.map((item) => item.id === id ? { ...replacement, startTime: current.startTime } : item) };
}

export async function saveMobilePlan(plan: MobilePlan): Promise<void> {
  const value = JSON.stringify(plan);
  if (Platform.OS === 'web') {
    localStorage.setItem(PLAN_KEY, value);
    return;
  }
  await SecureStore.setItemAsync(PLAN_KEY, value);
}

export async function getMobilePlan(): Promise<MobilePlan | null> {
  const value = Platform.OS === 'web'
    ? localStorage.getItem(PLAN_KEY)
    : await SecureStore.getItemAsync(PLAN_KEY);
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    return isMobilePlan(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
