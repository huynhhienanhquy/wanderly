export type ApiEnvironment = { nodeEnv: 'development' | 'test' | 'production'; port: number; webUrl: string };
export function validateEnvironment(env: NodeJS.ProcessEnv = process.env): ApiEnvironment {
  const nodeEnv = env.NODE_ENV === 'production' || env.NODE_ENV === 'test' ? env.NODE_ENV : 'development';
  const port = Number(env.PORT ?? 4000);
  const webUrl = env.WEB_URL ?? 'http://localhost:3000';
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('PORT không hợp lệ.');
  try { new URL(webUrl); } catch { throw new Error('WEB_URL không hợp lệ.'); }
  if (nodeEnv === 'production') {
    if (!env.DATABASE_URL) throw new Error('DATABASE_URL bắt buộc trong production.');
    for (const key of ['JWT_ACCESS_SECRET', 'JWT_REFRESH_SECRET'] as const) if (!env[key] || env[key]!.length < 32 || env[key] === 'change-me') throw new Error(`${key} phải là secret production tối thiểu 32 ký tự.`);
  }
  return { nodeEnv, port, webUrl };
}
