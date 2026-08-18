import type { PlanningConstraints } from '@wanderly/contracts';

export function recommendationReason(place: { rating: number | null; priceMin: number | null; categories: string[] }, constraints: PlanningConstraints, components: { preference: number; distance: number; rating: number; budget: number; popularity: number }) {
  const reasons: string[] = [];
  const matched = place.categories.filter((category) => constraints.interests.includes(category));
  if (matched.length > 0) reasons.push(`phù hợp sở thích ${matched.slice(0, 2).join(', ')}`);
  if (components.distance >= 0.7) reasons.push('gần điểm bắt đầu');
  if (place.rating !== null && place.rating >= 4) reasons.push(`được đánh giá ${place.rating.toFixed(1)}/5`);
  if (components.budget >= 0.5 && place.priceMin !== null) reasons.push('phù hợp ngân sách');
  return reasons.length > 0 ? `Gợi ý vì ${reasons.slice(0, 3).join(', ')}.` : 'Gợi ý cân bằng dựa trên mức độ phổ biến và dữ liệu hiện có.';
}
