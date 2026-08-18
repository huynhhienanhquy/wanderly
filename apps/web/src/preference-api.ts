import { interestCategoriesSchema, type InterestCategory } from '@wanderly/contracts';

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
