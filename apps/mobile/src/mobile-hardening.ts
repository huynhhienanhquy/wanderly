export const withRetry = async <T>(task: () => Promise<T>, attempts = 2): Promise<T> => { let error: unknown; for (let index = 0; index < attempts; index += 1) { try { return await task(); } catch (cause) { error = cause; } } throw error; };
export const isFreshCache = (savedAt: string, maxAgeMs: number) => Date.now() - Date.parse(savedAt) <= maxAgeMs;
export const createLoadingState = (loading: boolean, error = '') => ({ loading, error, ready: !loading && !error });
