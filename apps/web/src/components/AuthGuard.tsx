import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { hasWebSession, routes } from '../routes';

export function AuthGuard({ children }: { children: ReactNode }) {
  const location = useLocation();
  if (hasWebSession(sessionStorage)) return children;
  return <Navigate to={routes.login} replace state={{ from: location.pathname }} />;
}
