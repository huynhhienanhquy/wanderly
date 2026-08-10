import { FormEvent, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
export function ForgotPasswordPage() {
  const [message, setMessage] = useState('');
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const email = String(new FormData(event.currentTarget).get('email') ?? '');
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const body = (await response.json()) as { message?: string };
    setMessage(body.message ?? 'Kiểm tra email để tiếp tục.');
  }
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Quên mật khẩu</h1>
        <form className="auth-form" onSubmit={submit}>
          <label>
            Email
            <input name="email" type="email" required />
          </label>
          <button type="submit">Gửi hướng dẫn</button>
        </form>
        {message && <p role="status">{message}</p>}
      </section>
    </main>
  );
}
