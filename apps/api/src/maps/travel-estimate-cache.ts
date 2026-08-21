import type { TravelEstimate, TravelEstimateRequest } from '@wanderly/contracts';

export function travelCacheKey(input: TravelEstimateRequest) {
  const point = ({ latitude, longitude }: TravelEstimateRequest['origin']) => `${latitude.toFixed(5)},${longitude.toFixed(5)}`;
  return `${input.mode}:${point(input.origin)}:${point(input.destination)}`;
}

export class TravelEstimateCache {
  private readonly entries = new Map<string, { value: TravelEstimate; expiresAt: number }>();
  constructor(private readonly ttlMs = 15 * 60_000, private readonly maxEntries = 500, private readonly now = Date.now) {}
  get(key: string) {
    const entry = this.entries.get(key);
    if (!entry) return undefined;
    if (entry.expiresAt <= this.now()) { this.entries.delete(key); return undefined; }
    this.entries.delete(key); this.entries.set(key, entry);
    return entry.value;
  }
  set(key: string, value: TravelEstimate) {
    this.entries.delete(key); this.entries.set(key, { value, expiresAt: this.now() + this.ttlMs });
    while (this.entries.size > this.maxEntries) this.entries.delete(this.entries.keys().next().value!);
  }
}
