import type { PlanningConstraints } from '@wanderly/contracts';
import { distanceMeters } from '../places/place-distance';

export type Candidate = {
  latitude: number; longitude: number; priceMin: number | null;
  categories: string[];
  openingHours: Array<{ dayOfWeek: number; openMinutes: number | null; closeMinutes: number | null; isClosed: boolean }>;
};

export function matchesHardConstraints(candidate: Candidate, constraints: PlanningConstraints) {
  if (constraints.excludedCategories.some((slug) => candidate.categories.includes(slug))) return false;
  if (constraints.budget !== null && candidate.priceMin !== null && candidate.priceMin > constraints.budget / constraints.peopleCount) return false;
  if (constraints.startLocation && constraints.maxTravelRadiusMeters && distanceMeters(constraints.startLocation.latitude, constraints.startLocation.longitude, candidate.latitude, candidate.longitude) > constraints.maxTravelRadiusMeters) return false;
  if (constraints.date && constraints.startTime && candidate.openingHours.length > 0) {
    const day = new Date(`${constraints.date}T00:00:00Z`).getUTCDay();
    const [hour = 0, minute = 0] = constraints.startTime.split(':').map(Number);
    const at = hour * 60 + minute;
    const periods = candidate.openingHours.filter((period) => period.dayOfWeek === day);
    if (periods.length === 0 || !periods.some((period) => !period.isClosed && period.openMinutes !== null && period.closeMinutes !== null && at >= period.openMinutes && at < period.closeMinutes)) return false;
  }
  return true;
}
