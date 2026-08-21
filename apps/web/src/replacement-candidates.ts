import {
  candidateResponseSchema,
  type CandidateRequest,
  type RankedCandidate,
} from '@wanderly/contracts';
import type { ReplacementSlotConstraints } from './replacement-constraints';

export function buildReplacementCandidateRequest(
  slot: ReplacementSlotConstraints,
  date: string,
  limit = 10,
): CandidateRequest {
  const startLocation = slot.previousLocation ?? slot.nextLocation ?? undefined;
  return {
    constraints: {
      date: date || undefined,
      startTime: slot.startTime,
      endTime: slot.endTime || undefined,
      peopleCount: 1,
      budget: slot.remainingBudget,
      currency: 'VND',
      interests: slot.categorySlugs,
      excludedCategories: [],
      startLocation,
      maxTravelRadiusMeters: startLocation ? 10_000 : undefined,
      travelMode: 'DRIVE',
      notes: null,
    },
    limit,
  };
}

export async function fetchReplacementCandidates(
  apiUrl: string,
  slot: ReplacementSlotConstraints,
  date: string,
  excludedPlaceIds: string[],
  fetcher: typeof fetch = fetch,
): Promise<RankedCandidate[]> {
  const response = await fetcher(`${apiUrl}/recommendations/candidates`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(buildReplacementCandidateRequest(slot, date, 20)),
  });
  if (!response.ok) throw new Error(`Không thể tải địa điểm thay thế (${response.status}).`);
  const candidates = candidateResponseSchema.parse(await response.json()).data;
  const excluded = new Set(excludedPlaceIds);
  return candidates
    .filter(({ place }) => !excluded.has(place.id))
    .filter(({ place }) => (place.typicalDurationMinutes ?? slot.maxDurationMinutes) <= slot.maxDurationMinutes)
    .slice(0, 10);
}
