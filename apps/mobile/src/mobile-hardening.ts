export const withRetry = async <T>(task: () => Promise<T>, attempts = 2): Promise<T> => { let error: unknown; for (let index = 0; index < attempts; index += 1) { try { return await task(); } catch (cause) { error = cause; } } throw error; };
export const isFreshCache = (savedAt: string, maxAgeMs: number) => Date.now() - Date.parse(savedAt) <= maxAgeMs;
export const createLoadingState = (loading: boolean, error = '') => ({ loading, error, ready: !loading && !error });
export const emptyStateMessage = (count: number, label: string) => count === 0 ? `Chưa có ${label}.` : '';
export const isSafeDeepLinkToken = (token: string) => /^[A-Za-z0-9_-]{3,200}$/.test(token);
export const shouldClearNotification = (scheduledAt: number, now = Date.now()) => scheduledAt < now;
export const redactTelemetry = (value: string) => value.replace(/[\w.+-]+@[\w.-]+/g, '[redacted-email]');
export const isValidRequiredText = (value: string, min = 1) => value.trim().length >= min;
