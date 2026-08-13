import { fetchPlaceDetail, type PlaceDetail } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';
const PLAN_KEY = 'wanderly:current-plan';
type PlanItem = { id: string; slug: string; name: string };

export function PlansPage() {
  const [items, setItems] = useState<PlanItem[]>([]);
  const [details, setDetails] = useState<Record<string, PlaceDetail>>({});
  const [title, setTitle] = useState('Kế hoạch cuối tuần');
  const [date, setDate] = useState('');
  const [budget, setBudget] = useState('');
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(PLAN_KEY) ?? '[]') as PlanItem[];
    setItems(saved);
    void Promise.all(saved.map((item) => fetchPlaceDetail(API_URL, item.slug).catch(() => null))).then((rows) => setDetails(Object.fromEntries(rows.filter((row): row is PlaceDetail => row !== null).map((row) => [row.id, row]))));
  }, []);
  function persist(next: PlanItem[]) { localStorage.setItem(PLAN_KEY, JSON.stringify(next)); setItems(next); }
  function move(index: number, direction: -1 | 1) { const target = index + direction; if (target < 0 || target >= items.length) return; const next = [...items]; [next[index], next[target]] = [next[target], next[index]]; persist(next); }
  return <main className="page-shell"><Link className="home-link" to="/explore">Khám phá</Link><p className="eyebrow">Wanderly Plan</p><h1>{title}</h1><form onSubmit={(event) => event.preventDefault()}><input value={title} onChange={(event) => setTitle(event.target.value)} aria-label="Tên kế hoạch" /><input type="date" value={date} onChange={(event) => setDate(event.target.value)} aria-label="Ngày kế hoạch" /><input type="number" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder="Ngân sách (VND)" aria-label="Ngân sách" /></form>{items.length === 0 ? <p>Chưa có địa điểm trong kế hoạch.</p> : <ol>{items.map((item, index) => <li key={item.id}><button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button><button type="button" onClick={() => move(index, 1)} disabled={index === items.length - 1}>↓</button> <Link to={`/places/${item.slug}`}>{item.name}</Link><button type="button" onClick={() => persist(items.filter(({ id }) => id !== item.id))}>Xóa</button></li>)}</ol>}</main>;
}
