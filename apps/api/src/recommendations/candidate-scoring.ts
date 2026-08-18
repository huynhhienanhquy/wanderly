import type { PlanningConstraints } from '@wanderly/contracts';
import { distanceMeters } from '../places/place-distance';

export const RECOMMENDATION_WEIGHTS = { preference: 0.35, distance: 0.2, rating: 0.2, budget: 0.15, popularity: 0.1 } as const;
export type ScoreCandidate = { latitude: number; longitude: number; rating: number | null; priceMin: number | null; popularity: number; categories: string[] };

export function scoreCandidate(candidate: ScoreCandidate, constraints: PlanningConstraints) {
  const matches = candidate.categories.filter((category) => constraints.interests.includes(category)).length;
  const preference = constraints.interests.length === 0 ? 0.5 : Math.min(1, matches / constraints.interests.length);
  const rating = (candidate.rating ?? 0) / 5;
  const popularity = Math.max(0, Math.min(1, candidate.popularity));
  const budgetPerPerson = constraints.budget === null ? null : constraints.budget / constraints.peopleCount;
  const budget = budgetPerPerson === null || candidate.priceMin === null ? 0.5 : Math.max(0, 1 - candidate.priceMin / Math.max(1, budgetPerPerson));
  const distance = constraints.startLocation && constraints.maxTravelRadiusMeters
    ? Math.max(0, 1 - distanceMeters(constraints.startLocation.latitude, constraints.startLocation.longitude, candidate.latitude, candidate.longitude) / constraints.maxTravelRadiusMeters)
    : 0.5;
  const components = { preference, distance, rating, budget, popularity };
  const score = Object.entries(RECOMMENDATION_WEIGHTS).reduce((sum, [key, weight]) => sum + components[key as keyof typeof components] * weight, 0);
  return { score: Math.round(score * 10_000) / 10_000, components };
}
