import type { AuthResponse } from '@wanderly/contracts';

const ACCESS_TOKEN_KEY = 'wanderlyAccessToken';
const REFRESH_TOKEN_KEY = 'wanderlyRefreshToken';

type SessionStorage = Pick<Storage, 'getItem' | 'setItem' | 'removeItem'>;

export const getAccessToken = (storage: Pick<SessionStorage, 'getItem'>) => storage.getItem(ACCESS_TOKEN_KEY);
export const getRefreshToken = (storage: Pick<SessionStorage, 'getItem'>) => storage.getItem(REFRESH_TOKEN_KEY);

export const saveAuthSession = (storage: Pick<SessionStorage, 'setItem'>, auth: AuthResponse) => {
  storage.setItem(ACCESS_TOKEN_KEY, auth.tokens.accessToken);
  storage.setItem(REFRESH_TOKEN_KEY, auth.tokens.refreshToken);
};

export const clearAuthSession = (storage: Pick<SessionStorage, 'removeItem'>) => {
  storage.removeItem(ACCESS_TOKEN_KEY);
  storage.removeItem(REFRESH_TOKEN_KEY);
};
