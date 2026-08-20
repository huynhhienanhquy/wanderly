import { WanderlyApiClient } from '@wanderly/contracts';
import { mobileConfig } from './app-config';
import { getAccessToken, refreshAuthSession } from './auth-storage';

async function retryFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(input, init);
      if (response.status >= 500 && attempt < 2) continue;
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < 2) continue;
    }
  }
  throw lastError instanceof Error ? lastError : new Error('Network request failed');
}

export const mobileApiClient = new WanderlyApiClient({
  baseUrl: mobileConfig.apiUrl,
  fetch: retryFetch,
  getAccessToken,
  refreshAccessToken: () => refreshAuthSession(mobileConfig.apiUrl),
});
