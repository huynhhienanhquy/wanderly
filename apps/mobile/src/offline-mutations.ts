import * as SecureStore from 'expo-secure-store';
import { getAccessToken } from './auth-storage';

const KEY = 'wanderlyOfflineMutations';
export type OfflineMutation = { method: 'POST' | 'PUT' | 'PATCH' | 'DELETE'; path: string; body?: unknown };
export async function enqueueMutation(mutation: OfflineMutation): Promise<void> { const queue = await readMutations(); queue.push(mutation); await SecureStore.setItemAsync(KEY, JSON.stringify(queue.slice(-50))); }
export async function readMutations(): Promise<OfflineMutation[]> { try { const value = JSON.parse(await SecureStore.getItemAsync(KEY) ?? '[]'); return Array.isArray(value) ? value as OfflineMutation[] : []; } catch { return []; } }
export async function flushMutations(
  baseUrl: string,
  fetcher: typeof fetch = fetch,
  tokenProvider: () => Promise<string | null> = getAccessToken,
): Promise<number> {
  const queue = await readMutations();
  if (!queue.length) return 0;
  const token = await tokenProvider();
  if (!token) return 0;
  let flushed = 0;
  for (const mutation of queue) {
    let response: Response;
    try {
      response = await fetcher(`${baseUrl}/${mutation.path.replace(/^\/+/, '')}`, {
        method: mutation.method,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: mutation.body === undefined ? undefined : JSON.stringify(mutation.body),
      });
    } catch {
      break;
    }
    if (!response.ok) break;
    flushed += 1;
  }
  if (flushed) await SecureStore.setItemAsync(KEY, JSON.stringify(queue.slice(flushed)));
  return flushed;
}
