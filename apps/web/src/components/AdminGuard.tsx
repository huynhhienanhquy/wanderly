import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router';
import { checkAdminAccess } from '../admin-api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function AdminGuard({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const accessToken = sessionStorage.getItem('wanderlyAccessToken');

  useEffect(() => {
    if (!accessToken) {
      setAllowed(false);
      return;
    }
    void checkAdminAccess(API_URL, accessToken).then(setAllowed).catch(() => setAllowed(false));
  }, [accessToken]);

  if (allowed === null) return <p className="page-shell">Đang kiểm tra quyền quản trị…</p>;
  return allowed ? children : <Navigate to="/login" replace />;
}
