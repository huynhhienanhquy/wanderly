import * as SecureStore from 'expo-secure-store';

const KEY = 'wanderlyFavoritePlaceIds';
export async function syncFavoritePlaceIds(ids: string[]): Promise<void> { await SecureStore.setItemAsync(KEY, JSON.stringify([...new Set(ids)])); }

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
