import { registerRequestSchema, type AuthResponse } from '@wanderly/contracts';
import { FormEvent, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function RegisterPage() {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');
    const values = Object.fromEntries(new FormData(event.currentTarget));
    const parsed = registerRequestSchema.safeParse(values);
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? 'Dữ liệu không hợp lệ.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!response.ok) {
        const body = (await response.json()) as { message?: string };
        throw new Error(body.message ?? 'Không thể đăng ký.');
      }
      const auth = (await response.json()) as AuthResponse;
      sessionStorage.setItem('wanderlyAccessToken', auth.tokens.accessToken);
      setSuccess(`Chào mừng ${auth.user.displayName} đến với Wanderly!`);
      event.currentTarget.reset();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Không thể đăng ký.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <p className="eyebrow">Wanderly</p>
        <h1>Tạo tài khoản</h1>
        <p className="description">
          Bắt đầu hành trình được thiết kế theo sở thích của bạn.
        </p>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Họ và tên
            <input name="displayName" required maxLength={100} />
          </label>
          <label>
            Email
            <input name="email" type="email" required maxLength={320} />
          </label>
          <label>
            Mật khẩu
            <input
              name="password"
              type="password"
              required
              minLength={8}
              maxLength={128}
            />
          </label>
          {error && (
            <p className="form-message error" role="alert">
              {error}
            </p>
          )}
          {success && (
            <p className="form-message success" role="status">
              {success}
            </p>
          )}
          <button type="submit" disabled={submitting}>
            {submitting ? 'Đang tạo...' : 'Đăng ký'}
          </button>
        </form>
        <Link to="/">Quay về trang chủ</Link>
      </section>
    </main>
  );
}
