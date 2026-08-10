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
