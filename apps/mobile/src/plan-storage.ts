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
    return JSON.parse(value) as MobilePlan;
  } catch {
    return null;
  }
}
