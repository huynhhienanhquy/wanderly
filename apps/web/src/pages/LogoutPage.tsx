import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { clearAuthSession, getRefreshToken } from '../auth-session';
import { webConfig } from '../app-config';

export function LogoutPage() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function logout() {
      const refreshToken = getRefreshToken(sessionStorage);
      if (refreshToken) {
        await fetch(`${webConfig.apiUrl}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        }).catch(() => undefined);
      }
      clearAuthSession(sessionStorage);
      setDone(true);
    }
    void logout();
  }, []);

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>{done ? 'Đã đăng xuất' : 'Đang đăng xuất...'}</h1>
        {done && <Link to="/login">Đăng nhập lại</Link>}
      </section>
    </main>
  );
}
