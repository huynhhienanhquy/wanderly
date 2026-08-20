import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { redactTelemetry } from './mobile-hardening';

const KEY = 'wanderlyTelemetryQueue';
export type MobileTelemetryEvent = { name: string; properties?: Record<string, string | number | boolean>; occurredAt: string };

export async function trackMobileEvent(name: string, properties?: MobileTelemetryEvent['properties']): Promise<void> {
  const consent = Platform.OS === 'web' ? localStorage.getItem('wanderlyAnalyticsConsent') : await SecureStore.getItemAsync('wanderlyAnalyticsConsent');
  if (consent !== 'granted') return;
  const raw = Platform.OS === 'web' ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
  let queue: MobileTelemetryEvent[] = [];
  try { queue = raw ? JSON.parse(raw) as MobileTelemetryEvent[] : []; } catch { queue = []; }
  queue.push({ name: redactTelemetry(name), properties, occurredAt: new Date().toISOString() });
  const value = JSON.stringify(queue.slice(-50));
  if (Platform.OS === 'web') localStorage.setItem(KEY, value); else await SecureStore.setItemAsync(KEY, value);
}

export async function readMobileTelemetry(): Promise<MobileTelemetryEvent[]> {
  const raw = Platform.OS === 'web' ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
  try { return raw ? JSON.parse(raw) as MobileTelemetryEvent[] : []; } catch { return []; }
}
export async function flushMobileTelemetry(baseUrl: string, fetcher: typeof fetch = fetch): Promise<boolean> { const events = await readMobileTelemetry(); if (!events.length) return true; const response = await fetcher(`${baseUrl}/analytics/events`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ events }) }); if (!response.ok) return false; if (Platform.OS === 'web') localStorage.removeItem(KEY); else await SecureStore.deleteItemAsync(KEY); return true; }
