import type { RankedCandidate } from '@wanderly/contracts';
import type { PlanWeather } from './plan-weather';

export function weatherSuitableReplacements(
  candidates: RankedCandidate[],
  weather: PlanWeather,
): RankedCandidate[] {
  if (weather === 'CLEAR') return candidates;

  return candidates
    .filter(({ place }) => place.indoorOutdoor !== 'OUTDOOR')
    .map((candidate) => ({
      ...candidate,
      reason: `${candidate.reason} ${candidate.place.indoorOutdoor === 'INDOOR' ? 'Hoạt động trong nhà phù hợp' : 'Có không gian trong nhà dự phòng'} khi ${weather === 'RAIN' ? 'trời mưa' : 'nắng nóng'}.`,
    }))
    .sort((left, right) => {
      const environmentDifference = Number(right.place.indoorOutdoor === 'INDOOR') - Number(left.place.indoorOutdoor === 'INDOOR');
      return environmentDifference || right.score - left.score;
    });
}
