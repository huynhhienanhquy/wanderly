import type { LocalPlanItem, LocalPlanMeta } from './plan-storage';

export type SharedPlan = {
  meta: LocalPlanMeta;
  items: LocalPlanItem[];
};

export function encodeSharedPlan(plan: SharedPlan): string {
  return JSON.stringify(plan);
}

export function decodeSharedPlan(raw: string | null): SharedPlan | null {
  if (!raw) return null;

  try {
    const value = JSON.parse(raw) as Partial<SharedPlan>;
    if (!value.meta || typeof value.meta.title !== 'string' || !Array.isArray(value.items)) return null;
    return value as SharedPlan;
  } catch {
    return null;
  }
}
