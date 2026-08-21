import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { routes } from '../routes';
import { getAccessToken } from '../auth-session';

export function AuthGuard({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (getAccessToken(sessionStorage)) return children;
  return <Navigate to={routes.login} replace state={{ from: location.pathname }} />;
}
