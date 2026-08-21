import type { PlaceDetail } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';
import { sortPlanItems } from './plan-storage';

export type SlotLocation = { latitude: number; longitude: number };

export type ReplacementSlotConstraints = {
  itemId: string;
  startTime: string;
  endTime: string;
  maxDurationMinutes: number;
  previousLocation: SlotLocation | null;
  nextLocation: SlotLocation | null;
  categorySlugs: string[];
  remainingBudget: number | null;
};

const DEFAULT_SLOT_DURATION_MINUTES = 60;

function timeInMinutes(value: string): number {
  const [hours = 0, minutes = 0] = value.split(':').map(Number);
  return hours * 60 + minutes;
}

function location(place: PlaceDetail | undefined): SlotLocation | null {
  return place ? { latitude: place.latitude, longitude: place.longitude } : null;
}

export function getReplacementSlotConstraints(
  itemId: string,
  items: LocalPlanItem[],
  places: Record<string, PlaceDetail>,
  planEndTime: string,
  budget: string,
): ReplacementSlotConstraints | null {
  const sortedItems = sortPlanItems(items);
  const index = sortedItems.findIndex((item) => item.id === itemId);
  const item = sortedItems[index];
  if (!item) return null;

  const place = places[item.id];
  const previous = sortedItems[index - 1];
  const next = sortedItems[index + 1];
  const endTime = next?.startTime ?? planEndTime;
  const availableMinutes = endTime ? timeInMinutes(endTime) - timeInMinutes(item.startTime) : 0;
  const preferredDuration = place?.typicalDurationMinutes ?? DEFAULT_SLOT_DURATION_MINUTES;
  const parsedBudget = budget === '' ? null : Number(budget);
  const otherItemsCost = sortedItems.reduce((total, planItem) => {
    if (planItem.id === itemId) return total;
    return total + (places[planItem.id]?.priceMin ?? 0);
  }, 0);

  return {
    itemId,
    startTime: item.startTime,
    endTime,
    maxDurationMinutes: availableMinutes > 0 ? Math.min(preferredDuration, availableMinutes) : preferredDuration,
    previousLocation: location(previous ? places[previous.id] : undefined),
    nextLocation: location(next ? places[next.id] : undefined),
    categorySlugs: place?.categories.map(({ slug }) => slug) ?? [],
    remainingBudget: parsedBudget !== null && Number.isFinite(parsedBudget)
      ? Math.max(0, parsedBudget - otherItemsCost)
      : null,
  };
}
