import { expect, it } from 'vitest'; import { validateEnvironment } from './environment';
it('rejects placeholder production secrets', () => { expect(() => validateEnvironment({ NODE_ENV: 'production', DATABASE_URL: 'postgres://db', JWT_ACCESS_SECRET: 'change-me', JWT_REFRESH_SECRET: 'x'.repeat(32) })).toThrow('JWT_ACCESS_SECRET'); });
it('provides safe local defaults', () => { expect(validateEnvironment({})).toEqual({ nodeEnv: 'development', port: 4000, webUrl: 'http://localhost:3000' }); });
