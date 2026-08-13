import { Navigate } from 'react-router';
import type { ReactNode } from 'react';

export function AdminGuard({ children }: { children: ReactNode }) {
  const isAdmin = localStorage.getItem('wanderly:role') === 'ADMIN';
  return isAdmin ? children : <Navigate to="/" replace />;
}
