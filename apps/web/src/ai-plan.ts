import type { RankedCandidate } from '@wanderly/contracts';
import type { LocalPlanItem } from './plan-storage';

export const candidatesToPlan = (candidates: readonly RankedCandidate[], startHour = 8): LocalPlanItem[] =>
  candidates.slice(0, 4).map(({ place }, index) => ({
    id: place.id,
    slug: place.slug,
    name: place.name,
    startTime: `${String(Math.min(23, startHour + index * 2)).padStart(2, '0')}:00`,
  }));
