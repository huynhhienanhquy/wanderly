import { interestCategoriesSchema, type BehaviorSignal, type InterestCategory } from '@wanderly/contracts';

export async function fetchInterestCategories(baseUrl: string, fetcher: typeof fetch = fetch): Promise<InterestCategory[]> {
  const response = await fetcher(`${baseUrl}/preferences/categories`);
  if (!response.ok) throw new Error('Không thể tải danh mục sở thích.');
  return interestCategoriesSchema.parse(await response.json());
}

export function validateInterestSelection(categoryIds: string[]) {
  return new Set(categoryIds).size >= 3;
}

export async function saveUserPreferences(baseUrl: string, accessToken: string, categoryIds: string[], fetcher: typeof fetch = fetch) {
  const response = await fetcher(`${baseUrl}/preferences`, { method: 'PUT', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ categoryIds }) });
  if (!response.ok) throw new Error('Không thể lưu sở thích.');
}

export async function recordBehaviorSignal(baseUrl: string, accessToken: string, signal: BehaviorSignal, fetcher: typeof fetch = fetch): Promise<void> {
  const response = await fetcher(`${baseUrl}/preferences/signals`, { method: 'POST', headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify(signal) });
  if (!response.ok) throw new Error('Không thể lưu tín hiệu hành vi.');
}
