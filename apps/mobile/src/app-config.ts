export type MobileConfig = { apiUrl: string; appScheme: 'wanderly' };

export const readMobileConfig = (value = process.env.EXPO_PUBLIC_API_URL): MobileConfig => {
  const apiUrl = (value?.trim() || 'http://localhost:4000').replace(/\/$/, '');
  const parsed = new URL(apiUrl);
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('EXPO_PUBLIC_API_URL must use http or https');
  return { apiUrl, appScheme: 'wanderly' };
};

export const mobileConfig = readMobileConfig();
