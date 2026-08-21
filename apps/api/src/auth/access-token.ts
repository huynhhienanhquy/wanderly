import { createHmac, timingSafeEqual } from 'node:crypto';

export type AccessTokenClaims = {
  sub: string;
  role: 'USER' | 'ADMIN';
  iat: number;
  exp: number;
};

const TTL_SECONDS = 15 * 60;
const secret = () =>
  process.env.JWT_ACCESS_SECRET ?? 'wanderly-local-access-secret';
const encode = (value: string) => Buffer.from(value).toString('base64url');

export function createAccessToken(userId: string, role: string): string {
  const header = encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const now = Math.floor(Date.now() / 1000);
  const payload = encode(
    JSON.stringify({ sub: userId, role, iat: now, exp: now + TTL_SECONDS }),
  );
  const signature = createHmac('sha256', secret())
    .update(`${header}.${payload}`)
    .digest('base64url');
  return `${header}.${payload}.${signature}`;
}

export function verifyAccessToken(token: string): AccessTokenClaims | null {
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return null;
  const expected = createHmac('sha256', secret())
    .update(`${header}.${payload}`)
    .digest();
  const actual = Buffer.from(signature, 'base64url');
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected))
    return null;
  try {
    const claims = JSON.parse(
      Buffer.from(payload, 'base64url').toString(),
    ) as AccessTokenClaims;
    if (
      !claims.sub ||
      !['USER', 'ADMIN'].includes(claims.role) ||
      claims.exp <= Date.now() / 1000
    )
      return null;
    return claims;
  } catch {
    return null;
  }
}
