import type { PlaceDetail } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';

export function estimatePlanBudget(items: LocalPlanItem[], places: Record<string, PlaceDetail>, budget: string) {
  const missing: string[] = [];
  const total = items.reduce((sum, item) => {
    const price = places[item.id]?.priceMin;
    if (price === null || price === undefined) { missing.push(item.name); return sum; }
    return sum + price;
  }, 0);
  const limit = budget === '' ? null : Number(budget);
  return { total, limit, exceededBy: limit !== null && total > limit ? total - limit : 0, missing };
}
