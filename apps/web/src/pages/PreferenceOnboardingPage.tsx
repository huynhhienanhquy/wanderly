import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router';
import type { InterestCategory } from '@wanderly/contracts';
import { fetchInterestCategories, validateInterestSelection } from '../preference-api';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

export function PreferenceOnboardingPage() {
  const token = sessionStorage.getItem('wanderlyAccessToken');
  const [categories, setCategories] = useState<InterestCategory[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    void fetchInterestCategories(API_URL).then(setCategories).catch((error: Error) => setMessage(error.message));
  }, []);

  if (!token) return <Navigate to="/login" replace />;

  function toggle(id: string) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function submit() {
    if (!validateInterestSelection(selected)) {
      setMessage('Hãy chọn ít nhất 3 sở thích.');
      return;
    }
    sessionStorage.setItem('wanderlyPendingPreferences', JSON.stringify(selected));
    setMessage('Đã ghi nhận lựa chọn. Bạn có thể tiếp tục khám phá Wanderly.');
  }

  return <main className="page-shell">
    <p className="eyebrow">Cá nhân hóa Wanderly</p>
    <h1>Bạn thích trải nghiệm nào?</h1>
    <p>Chọn ít nhất 3 mục để các gợi ý phù hợp hơn.</p>
    <section className="detail-section" aria-label="Danh mục sở thích">
      {categories.map((category) => <label key={category.id}>
        <input type="checkbox" checked={selected.includes(category.id)} onChange={() => toggle(category.id)} />{' '}
        {category.icon ?? '✦'} {category.name}
      </label>)}
    </section>
    <button type="button" onClick={submit}>Lưu sở thích</button>
    {message && <p role="status">{message}</p>}
    <Link className="home-link" to="/explore">Bỏ qua và khám phá</Link>
  </main>;
}
