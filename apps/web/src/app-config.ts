export type WebConfig = { apiUrl: string };

export const readWebConfig = (env: Record<string, string | boolean | undefined>): WebConfig => {
  const configuredUrl = typeof env.VITE_API_URL === 'string' ? env.VITE_API_URL.trim() : '';
  const apiUrl = configuredUrl || 'http://localhost:4000';
  const parsed = new URL(apiUrl);
  if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('VITE_API_URL must use http or https');
  return { apiUrl: parsed.toString().replace(/\/$/, '') };
};

export const webConfig = readWebConfig(import.meta.env);
