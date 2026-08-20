import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

type CacheEntry<T> = { savedAt: string; value: T };

export async function writeCache<T>(key: string, value: T): Promise<void> {
  const serialized = JSON.stringify({ savedAt: new Date().toISOString(), value } satisfies CacheEntry<T>);
  if (Platform.OS === 'web') { localStorage.setItem(`wanderlyCache:${key}`, serialized); return; }
  await SecureStore.setItemAsync(`wanderlyCache:${key}`, serialized);
}

export async function readCache<T>(key: string): Promise<CacheEntry<T> | null> {
  const serialized = Platform.OS === 'web' ? localStorage.getItem(`wanderlyCache:${key}`) : await SecureStore.getItemAsync(`wanderlyCache:${key}`);
  if (!serialized) return null;
  try { return JSON.parse(serialized) as CacheEntry<T>; } catch { return null; }
}
