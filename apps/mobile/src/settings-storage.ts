import * as SecureStore from 'expo-secure-store';
export type MobileTheme = 'light' | 'dark';
const KEY = 'wanderlyTheme';
export const getMobileTheme = async (): Promise<MobileTheme> => (await SecureStore.getItemAsync(KEY)) === 'dark' ? 'dark' : 'light';
export const saveMobileTheme = (theme: MobileTheme) => SecureStore.setItemAsync(KEY, theme);
