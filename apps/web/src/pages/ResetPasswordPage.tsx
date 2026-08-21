import { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const password = String(
      new FormData(event.currentTarget).get('password') ?? '',
    );
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: params.get('token'), password }),
    });
    setMessage(
      response.ok
        ? 'Mật khẩu đã được cập nhật.'
        : 'Liên kết không hợp lệ hoặc đã hết hạn.',
    );
  }
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Đặt lại mật khẩu</h1>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Mật khẩu mới
            <input name="password" type="password" minLength={8} required />
          </label>
          <button type="submit">Cập nhật mật khẩu</button>
        </form>
        {message && <p role="status">{message}</p>}
      </section>
    </main>
  );
}
