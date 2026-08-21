export const isSessionExpired = (expiresAt: number, now = Date.now()) => expiresAt <= now;
export const eventCacheKey = (date = new Date()) => `events:${date.toISOString().slice(0, 10)}`;
export const reviewDraftKey = (placeId: string) => `review-draft:${placeId}`;
export const formatPlanShareText = (title: string, items: Array<{ startTime: string; name: string }>) => `${title}\n${items.map((item) => `${item.startTime} — ${item.name}`).join('\n')}`;
export const debounceDelayMs = (query: string) => query.trim().length < 3 ? 350 : 200;
export const isOfflineStatus = (status: string) => status.toLowerCase() === 'offline';
export const hasAnalyticsConsent = (value: string | null) => value === 'granted';
export const canRequestNotifications = (status: string) => status === 'undetermined';
export const validateApiUrl = (value: string) => { try { const url = new URL(value); return url.protocol === 'http:' || url.protocol === 'https:'; } catch { return false; } };
