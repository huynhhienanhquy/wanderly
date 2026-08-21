import { estimateBudget, type PlaceDetail } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';

type BudgetPlace = Pick<PlaceDetail, 'priceMin' | 'categories'>;

export function estimatePlanBudget(items: LocalPlanItem[], places: Record<string, BudgetPlace>, budget: string) {
  const missing: string[] = [];
  const lines = items.flatMap((item) => {
    const price = places[item.id]?.priceMin;
    if (price === null || price === undefined) { missing.push(item.name); return []; }
    const food = places[item.id]?.categories?.some(({ slug }) => ['food', 'restaurant'].includes(slug));
    return [{ type: food ? 'FOOD' as const : 'PLACE' as const, label: item.name, unitAmount: price, quantity: 1 }];
  });
  const estimate = estimateBudget(lines);
  const limit = budget === '' ? null : Number(budget);
  return { ...estimate, limit, exceededBy: limit !== null && estimate.total > limit ? estimate.total - limit : 0, missing };
}
