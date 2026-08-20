import { WanderlyApiClient } from '@wanderly/contracts';
import { mobileConfig } from './app-config';
import { getAccessToken, refreshAuthSession } from './auth-storage';

export const mobileApiClient = new WanderlyApiClient({
  baseUrl: mobileConfig.apiUrl,
  getAccessToken,
  refreshAccessToken: () => refreshAuthSession(mobileConfig.apiUrl),
});
