import type { PlaceSort } from '@wanderly/contracts';

export type CollectionDefinition = {
  key: 'trending' | 'budget' | 'date' | 'rainy-day';
  title: string;
  description: string;
  options: { sort: PlaceSort; priceMax?: number; category?: string; indoorOutdoor?: 'INDOOR' };
};

export const collections: CollectionDefinition[] = [
  { key: 'trending', title: 'Đang được yêu thích', description: 'Các địa điểm nổi bật nhất.', options: { sort: 'popular' } },
  { key: 'budget', title: 'Dưới 100k', description: 'Gợi ý nhẹ ví cho hôm nay.', options: { sort: 'priceAsc', priceMax: 100000 } },
  { key: 'date', title: 'Hẹn hò', description: 'Không gian cà phê phù hợp cho hai người.', options: { sort: 'rating', category: 'cafe' } },
  { key: 'rainy-day', title: 'Ngày mưa', description: 'Hoạt động trong nhà, không lo thời tiết.', options: { sort: 'rating', indoorOutdoor: 'INDOOR' } },
];
