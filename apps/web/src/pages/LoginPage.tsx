import { loginRequestSchema, type AuthResponse } from '@wanderly/contracts';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function LoginPage() {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const parsed = loginRequestSchema.safeParse(
      Object.fromEntries(new FormData(event.currentTarget)),
    );
    if (!parsed.success) {
      setError('Email hoặc mật khẩu không hợp lệ.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as
        | AuthResponse
        | { message?: string };
      if (!response.ok || !('tokens' in body)) {
        throw new Error(
          'message' in body ? body.message : 'Không thể đăng nhập.',
        );
      }
      sessionStorage.setItem('wanderlyAccessToken', body.tokens.accessToken);
      sessionStorage.setItem('wanderlyRefreshToken', body.tokens.refreshToken);
      window.location.assign('/');
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Không thể đăng nhập.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Wanderly</p>
        <h1>Đăng nhập</h1>
        <p className="description">Tiếp tục hành trình của bạn.</p>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <label>
            Mật khẩu
            <input name="password" type="password" required minLength={8} />
          </label>
          {error && (
            <p className="form-message error" role="alert">
              {error}
            </p>
          )}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        <p>
          Chưa có tài khoản? <Link to="/register">Đăng ký</Link>
        </p>
      </section>
    </main>
  );
}
