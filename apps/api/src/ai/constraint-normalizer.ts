import { extractConstraintsResponseSchema, type ExtractConstraintsRequest, type ExtractConstraintsResponse } from '@wanderly/contracts';

export function normalizeConstraints(raw: Record<string, unknown>, request: ExtractConstraintsRequest): ExtractConstraintsResponse {
  const source = (raw.constraints ?? {}) as Record<string, unknown>;
  const compact = (value: unknown) => Array.isArray(value) ? [...new Set(value.filter((item): item is string => typeof item === 'string').map((item) => item.trim().toLowerCase()).filter(Boolean))] : [];
  const missingFields = Array.isArray(raw.missingFields) ? raw.missingFields.filter((item): item is string => typeof item === 'string') : [];
  if (source.peopleCount == null && !missingFields.includes('peopleCount')) missingFields.push('peopleCount');
  const constraints: Record<string, unknown> = {
    ...source,
    peopleCount: source.peopleCount ?? 1,
    budget: source.budget ?? null,
    currency: typeof source.currency === 'string' ? source.currency.toUpperCase() : 'VND',
    interests: compact(source.interests), excludedCategories: compact(source.excludedCategories),
    travelMode: source.travelMode ?? 'DRIVE', notes: source.notes ?? null,
    startLocation: source.startLocation ?? request.currentLocation,
  };
  for (const key of ['date', 'startTime', 'endTime', 'maxTravelRadiusMeters'] as const) if (constraints[key] == null) delete constraints[key];
  if (constraints.startLocation == null) delete constraints.startLocation;
  return extractConstraintsResponseSchema.parse({ constraints, missingFields, warnings: Array.isArray(raw.warnings) ? raw.warnings : [] });
}
