import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const KEY = 'wanderlyTelemetryQueue';
export type MobileTelemetryEvent = { name: string; properties?: Record<string, string | number | boolean>; occurredAt: string };

export async function trackMobileEvent(name: string, properties?: MobileTelemetryEvent['properties']): Promise<void> {
  const raw = Platform.OS === 'web' ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
  let queue: MobileTelemetryEvent[] = [];
  try { queue = raw ? JSON.parse(raw) as MobileTelemetryEvent[] : []; } catch { queue = []; }
  queue.push({ name, properties, occurredAt: new Date().toISOString() });
  const value = JSON.stringify(queue.slice(-50));
  if (Platform.OS === 'web') localStorage.setItem(KEY, value); else await SecureStore.setItemAsync(KEY, value);
}

export async function readMobileTelemetry(): Promise<MobileTelemetryEvent[]> {
  const raw = Platform.OS === 'web' ? localStorage.getItem(KEY) : await SecureStore.getItemAsync(KEY);
  try { return raw ? JSON.parse(raw) as MobileTelemetryEvent[] : []; } catch { return []; }
}
