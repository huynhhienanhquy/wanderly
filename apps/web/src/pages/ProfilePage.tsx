import type { Profile } from '@wanderly/contracts';
import { FormEvent, useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const token = () => sessionStorage.getItem('wanderlyAccessToken');
export function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [message, setMessage] = useState('');
  useEffect(() => {
    void fetch(`${API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token()}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setProfile)
      .catch(() => setMessage('Vui lòng đăng nhập.'));
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formValues = Object.fromEntries(new FormData(event.currentTarget));
    const data = {
      ...formValues,
      phone: formValues.phone === '' ? null : formValues.phone,
    };
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      setProfile((await response.json()) as Profile);
      setMessage('Đã cập nhật hồ sơ.');
    } else setMessage('Không thể cập nhật hồ sơ.');
  }
  return (
    <main className="auth-shell">
      <section className="auth-card">
        <h1>Hồ sơ cá nhân</h1>
        {profile && (
          <form className="auth-form" onSubmit={submit}>
            <label>
              Email
              <input value={profile.email} disabled />
            </label>
            <label>
              Tên hiển thị
              <input
                name="displayName"
                defaultValue={profile.displayName}
                required
              />
            </label>
            <label>
              Số điện thoại
              <input name="phone" defaultValue={profile.phone ?? ''} />
            </label>
            <label>
              Múi giờ
              <input name="timezone" defaultValue={profile.timezone} />
            </label>
            <label>
              Ngôn ngữ
              <input name="locale" defaultValue={profile.locale} />
            </label>
            <button type="submit">Lưu thay đổi</button>
          </form>
        )}
        {message && <p role="status">{message}</p>}
      </section>
    </main>
  );
}
