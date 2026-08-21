import type { RankedCandidate } from '@wanderly/contracts';

export type BudgetReplacement = RankedCandidate & { savings: number };

export function cheaperReplacementCandidates(
  candidates: RankedCandidate[],
  currentPrice: number | null | undefined,
): BudgetReplacement[] {
  if (currentPrice === null || currentPrice === undefined) return [];

  return candidates
    .flatMap((candidate) => {
      const candidatePrice = candidate.place.priceMin;
      if (candidatePrice === null || candidatePrice >= currentPrice) return [];
      const savings = currentPrice - candidatePrice;
      return [{
        ...candidate,
        savings,
        reason: `${candidate.reason} Tiết kiệm khoảng ${savings.toLocaleString('vi-VN')}đ so với địa điểm hiện tại.`,
      }];
    })
    .sort((left, right) => right.savings - left.savings || right.score - left.score);
}
