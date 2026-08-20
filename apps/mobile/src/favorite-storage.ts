import * as SecureStore from 'expo-secure-store';
import { enqueueMutation } from './offline-mutations';

const KEY = 'wanderlyFavoritePlaceIds';
export async function syncFavoritePlaceIds(ids: string[]): Promise<void> { await SecureStore.setItemAsync(KEY, JSON.stringify([...new Set(ids)])); }
export async function syncFavoritesToApi(baseUrl: string, fetcher: typeof fetch = fetch): Promise<boolean> { const ids = await getFavoritePlaceIds(); const responses = await Promise.all(ids.map((id) => fetcher(`${baseUrl}/favorites/${id}`, { method: 'POST' }).catch(() => null))); const failed = responses.map((response, index) => response?.ok ? null : ids[index]).filter((id): id is string => Boolean(id)); await Promise.all(failed.map((id) => enqueueMutation({ method: 'POST', path: `favorites/${id}` }))); return failed.length === 0; }

export async function getFavoritePlaceIds(): Promise<string[]> {
  try {
    const value: unknown = JSON.parse(await SecureStore.getItemAsync(KEY) ?? '[]');
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [];
  } catch { return []; }
}

export async function toggleFavoritePlace(id: string): Promise<boolean> {
  const current = await getFavoritePlaceIds();
  const favorite = !current.includes(id);
  const next = favorite ? [...current, id] : current.filter((value) => value !== id);
  await SecureStore.setItemAsync(KEY, JSON.stringify(next));
  return favorite;
}
