import type { PlaceDetail, PlaceSummary, RankedCandidate } from '@wanderly/contracts';
import { estimatePlanBudget } from './plan-budget';
import { validateDurations } from './plan-duration';
import { buildRouteSummary } from './plan-route';
import type { LocalPlanItem } from './plan-storage';

export type ReplacementPreview = {
  items: LocalPlanItem[];
  routeKilometers: number;
  durationMinutes: number;
  budgetTotal: number;
  budgetExceededBy: number;
  impact: {
    routeKilometersDelta: number;
    durationMinutesDelta: number;
    budgetDelta: number;
  };
  valid: boolean;
  issues: string[];
};

type CalculationPlace = Pick<PlaceSummary, 'id' | 'name' | 'latitude' | 'longitude' | 'priceMin' | 'typicalDurationMinutes' | 'categories'>;

function calculate(items: LocalPlanItem[], places: Record<string, CalculationPlace>, endTime: string, budget: string) {
  const route = buildRouteSummary(items.flatMap((item) => {
    const place = places[item.id];
    return place ? [{ id: place.id, name: place.name, latitude: place.latitude, longitude: place.longitude }] : [];
  }));
  const duration = validateDurations(
    items,
    Object.fromEntries(Object.entries(places).map(([id, place]) => [id, place.typicalDurationMinutes])),
    endTime,
    Object.fromEntries(Object.entries(places).map(([id, place]) => [id, { latitude: place.latitude, longitude: place.longitude }])),
  );
  const budgetResult = estimatePlanBudget(items, places, budget);
  return { route, duration, budget: budgetResult };
}

export function previewReplacement(
  itemId: string,
  candidate: RankedCandidate,
  items: LocalPlanItem[],
  details: Record<string, PlaceDetail>,
  endTime: string,
  budget: string,
): ReplacementPreview | null {
  const currentItem = items.find((item) => item.id === itemId);
  if (!currentItem) return null;

  const nextItems = items.map((item) => item.id === itemId ? {
    id: candidate.place.id,
    slug: candidate.place.slug,
    name: candidate.place.name,
    startTime: item.startTime,
  } : item);
  const currentPlaces: Record<string, CalculationPlace> = details;
  const nextPlaces = { ...currentPlaces };
  delete nextPlaces[itemId];
  nextPlaces[candidate.place.id] = candidate.place;
  const before = calculate(items, currentPlaces, endTime, budget);
  const after = calculate(nextItems, nextPlaces, endTime, budget);
  const issues = [...after.duration.issues];
  if (after.budget.exceededBy > 0) issues.push(`Vượt ngân sách ${after.budget.exceededBy.toLocaleString('vi-VN')}đ.`);

  return {
    items: nextItems,
    routeKilometers: after.route.totalDistanceKilometers,
    durationMinutes: after.duration.totalMinutes,
    budgetTotal: after.budget.total,
    budgetExceededBy: after.budget.exceededBy,
    impact: {
      routeKilometersDelta: after.route.totalDistanceKilometers - before.route.totalDistanceKilometers,
      durationMinutesDelta: after.duration.totalMinutes - before.duration.totalMinutes,
      budgetDelta: after.budget.total - before.budget.total,
    },
    valid: issues.length === 0,
    issues,
  };
}
