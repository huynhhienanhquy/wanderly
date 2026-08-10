import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function LogoutPage() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    async function logout() {
      const refreshToken = sessionStorage.getItem('wanderlyRefreshToken');
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        }).catch(() => undefined);
      }
      sessionStorage.removeItem('wanderlyAccessToken');
      sessionStorage.removeItem('wanderlyRefreshToken');
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
