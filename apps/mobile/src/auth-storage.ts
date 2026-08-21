import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { authResponseSchema } from '@wanderly/contracts';
import { isSessionExpired } from './next-features';

export async function saveAuthTokens(
  accessToken: string,
  refreshToken: string,
) {
  if (Platform.OS === 'web') {
    sessionStorage.setItem('wanderlyAccessToken', accessToken);
    sessionStorage.setItem('wanderlyRefreshToken', refreshToken);
    return;
  }
  await Promise.all([
    SecureStore.setItemAsync('wanderlyAccessToken', accessToken),
    SecureStore.setItemAsync('wanderlyRefreshToken', refreshToken),
  ]);
}

export async function getRefreshToken(): Promise<string | null> {
  return Platform.OS === 'web'
    ? sessionStorage.getItem('wanderlyRefreshToken')
    : SecureStore.getItemAsync('wanderlyRefreshToken');
}

export async function getAccessToken(): Promise<string | null> {
  const token = Platform.OS === 'web'
    ? sessionStorage.getItem('wanderlyAccessToken')
    : SecureStore.getItemAsync('wanderlyAccessToken');
  const value = await token; try { const payload = JSON.parse(atob(value!.split('.')[1])); if (payload.exp && isSessionExpired(payload.exp * 1000)) return null; } catch { /* opaque token */ } return value;
}

export async function clearAuthTokens(): Promise<void> {
  if (Platform.OS === 'web') {
    sessionStorage.removeItem('wanderlyAccessToken');
    sessionStorage.removeItem('wanderlyRefreshToken');
    return;
  }
  await Promise.all([
    SecureStore.deleteItemAsync('wanderlyAccessToken'),
    SecureStore.deleteItemAsync('wanderlyRefreshToken'),
  ]);
}

export async function refreshAuthSession(baseUrl: string, fetcher: typeof fetch = fetch): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;
  const response = await fetcher(`${baseUrl}/auth/refresh`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    await clearAuthTokens();
    return null;
  }
  const auth = authResponseSchema.parse(await response.json());
  await saveAuthTokens(auth.tokens.accessToken, auth.tokens.refreshToken);
  return auth.tokens.accessToken;
}
