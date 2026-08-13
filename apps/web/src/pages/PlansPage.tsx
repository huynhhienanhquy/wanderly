import { Link } from 'react-router';
import { fetchPlaceDetail, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useState } from 'react';

const PLAN_KEY = 'wanderly:current-plan';
const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const PLAN_META_KEY = 'wanderly:plan-meta';
type PlanItem = { id: string; slug: string; name: string };

export function PlansPage() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [title, setTitle] = useState('Kế hoạch cuối tuần');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  const [details, setDetails] = useState<Record<string, PlaceDetail>>({});
  useEffect(() => { const saved = JSON.parse(localStorage.getItem(PLAN_KEY) ?? '[]') as PlanItem[]; setItems(saved); const meta = JSON.parse(localStorage.getItem(PLAN_META_KEY) ?? '{}') as { title?: string; date?: string; budget?: string }; setTitle(meta.title ?? 'Kế hoạch cuối tuần'); setDate(meta.date ?? ''); setBudget(meta.budget ?? ''); void Promise.all(saved.map(async (item) => { try { return await fetchPlaceDetail(API_URL, item.slug); } catch { return null; } })).then((rows) => setDetails(Object.fromEntries(rows.filter((row): row is PlaceDetail => row !== null).map((row) => [row.id, row])))); }, []);
  function saveMeta() { localStorage.setItem(PLAN_META_KEY, JSON.stringify({ title, date, budget })); }
  function remove(id: string) {
    const next = items.filter((item) => item.id !== id);
    localStorage.setItem(PLAN_KEY, JSON.stringify(next));
    setItems(next);
  }
  const day = date ? new Date(`${date}T12:00:00`).getDay() : null;
  const totalMinutes = items.reduce((total, item) => total + (details[item.id]?.typicalDurationMinutes ?? 0), 0);
  const totalCost = items.reduce((total, item) => total + (details[item.id]?.priceMin ?? 0), 0);
  const budgetValue = budget ? Number(budget) : null;
  const missingDuration = items.some((item) => details[item.id] && details[item.id].typicalDurationMinutes === null);
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Plan</p><h1>Kế hoạch của tôi</h1><form onSubmit={(event) => { event.preventDefault(); saveMeta(); }}><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Tên kế hoạch" /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Ngày kế hoạch" /><input type="number" min="0" step="1000" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Ngân sách (VND)" aria-label="Ngân sách" /><button type="submit">Lưu thông tin</button></form>{items.length > 0 && <><p>Tổng thời lượng dự kiến: {Math.floor(totalMinutes / 60)} giờ {totalMinutes % 60} phút{missingDuration && ' (một số địa điểm chưa có thời lượng)'}</p><p>Chi phí tối thiểu: {totalCost.toLocaleString('vi-VN')}đ{budgetValue !== null && totalCost > budgetValue && ' — Vượt ngân sách'}</p></>}{items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : <ol>{items.map((item, index) => { const detail = details[item.id]; const hour = day === null ? null : detail?.openingHours.find((entry) => entry.dayOfWeek === day); const closed = hour?.isClosed === true; return <li key={item.id}><Link to={`/places/${item.slug}`}>{index + 1}. {item.name}</Link>{closed && <small> — Đóng cửa ngày đã chọn</small>}<button type="button" onClick={() => remove(item.id)}>Xóa</button></li>; })}</ol>}</main>;
}
