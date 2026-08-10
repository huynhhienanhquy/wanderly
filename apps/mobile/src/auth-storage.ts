import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

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
  return Platform.OS === 'web'
    ? sessionStorage.getItem('wanderlyAccessToken')
    : SecureStore.getItemAsync('wanderlyAccessToken');
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
